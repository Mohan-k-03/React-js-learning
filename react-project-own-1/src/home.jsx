// src/Home.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
      }}
    >
      <h2>Home Page</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
