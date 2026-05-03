import Navbar from "@/components/shared/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/hooks/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </div>
  ),

  notFoundComponent: () => <div>Not found Brother!</div>,
});
