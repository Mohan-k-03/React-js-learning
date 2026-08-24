// src/App.jsx
import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import Home from "./Home";
import Login from "./Login";

export default function App() {
  return (
    <ThemeProvider>
      <div>
        <Home />
        <Login />
      </div>
    </ThemeProvider>
  );
}
