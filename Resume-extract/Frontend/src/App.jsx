import { useState } from "react";
// import   'server.js'
export default function App() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
  });
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const uploadPayload = new FormData();
    uploadPayload.append("resume", file);
    try {
      const response = await fetch("http://localhost:5000/api/parse-resume", {
        method: "POST",
        body: uploadPayload,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Upload failed (${response.status})`,
        );
      }
      const parsedData = await response.json();
      setFormData({
        fullName: parsedData.fullName || "",
        email: parsedData.email || "",
        phone: parsedData.phone || "",
        skills: Array.isArray(parsedData.skills)
          ? parsedData.skills.join(",")
          : parsedData.skills || "",
      });
    } catch (err) {
      console.error("Error uploading resume", err);
      alert(`Error parsing PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Upload you resume to autoFill</h2>
      <input type="file" accept=".pdf" onChange={handleFileUpload} />
      {loading && <p>Parsing doucment with AI...</p>}

      <form action="">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          rows={4}
        />
      </form>
    </div>
  );
}
