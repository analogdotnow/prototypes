import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppLayout, Dashboard } from "./app";
import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import { prototypes } from "./prototypes";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${prototypes[0].id}`} replace />,
      },
      {
        path: "/proto/:prototypeId",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <Navigate to={`/proto/${prototypes[0].id}`} replace />,
      },
    ],
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
