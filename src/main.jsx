import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// REACT ROUTER IMPORTS
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// TAILWIND CSS
import "./index.css";

// MAIN ROOT
import Root from "./Root/Root";

// PUBLIC
import Home from "./pages/Public/Home/Home";

// ALL ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
