import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./Login";
import Home from "./Home";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  {
    path: "/Login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
