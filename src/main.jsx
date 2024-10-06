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
import AuthProvider from "./providers/AuthProvider";
import Register from "./pages/Public/Register/Register";
import { Toaster } from "sonner";
import Login from "./pages/Public/Login/Login";

// USER ROUTES
import MyTables from "./pages/User/MyTables/MyTables";
import PrivateRoute from "./routes/PrivateRoute";
import Table from "./pages/User/Table/Table";

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
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      // PRIVATE USER ROUTES
      {
        path: "/my-tables",
        element: (
          <PrivateRoute>
            <MyTables></MyTables>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tables/:id",
        element: (
          <PrivateRoute>
            <Table></Table>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster richColors position="bottom-right"></Toaster>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
