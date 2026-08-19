import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./react-project-own-copy/src/Login";
import Home from "./react-project-own-copy/src/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
