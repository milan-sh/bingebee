import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useUserStore } from "./store/userStore";
import { useInitAuth } from "@/store/useInitAuth";

const router = createRouter({
  routeTree,
  context: { isAuthenticated: false },
});

function App() {
  useInitAuth();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);

  if (isLoading) return null;

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
