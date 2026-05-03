import Navbar from "@/components/shared/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div>
      <header>
        <Navbar/>
      </header>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),

  notFoundComponent: () => (
    <div>Not found Brother!</div>
  ),
});
