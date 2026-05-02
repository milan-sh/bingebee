import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header></header>
      <main className="min-h-screen bg-neutral-900 text-white">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),

  notFoundComponent: () => (
    <div>Not found Brother!</div>
  ),
});
