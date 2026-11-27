import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AllTemplatesPage,
  HolidayPage,
  KidsBirthdayPage,
  AdultBirthdayPage,
  WeddingPage,
} from "./adult_bday.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllTemplatesPage />} />
        <Route path="/holiday" element={<HolidayPage />} />
        <Route path="/kids-bday" element={<KidsBirthdayPage />} />
        <Route path="/adult-bday" element={<AdultBirthdayPage />} />
        <Route path="/wedding" element={<WeddingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
