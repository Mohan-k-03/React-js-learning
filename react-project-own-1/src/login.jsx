// src/Login.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function Login() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#f0f0f0" : "#222",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
      }}
    >
      <h2>Login Page</h2>
      <p>Theme applied: {theme}</p>
    </div>
  );
}
