import express from "express";
import cors from "cors";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(currentDirectory, "API.env") });

const app = express();
const upload = multer();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Resume extraction backend is running" });
});

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
app.post("/api/parse-resume", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "no file uploaded" });
    }

    const parser = new PDFParse({ data: req.file.buffer });
    const pdfData = await parser.getText();
    await parser.destroy();

    const model = ai.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `Extract the following details from this resume text into valid JSON format:
    {"fullName":"", "email":"", "phone":
        "", "skills":""
    } 
    Resume Text:
    ${pdfData.text}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("faild to parse JSON response");
    }
    res.json(JSON.parse(jsonMatch[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to parse resume" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`backend server running on http://localhost:${PORT}/`),
);
