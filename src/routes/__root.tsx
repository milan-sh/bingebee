import Navbar from "@/components/shared/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "@/hooks/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export const Route = createRootRoute({
  component: () => (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col min-h-svh">
            <header>
              <Navbar />
            </header>
            <main className="flex-1">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </ThemeProvider>
      <TanStackRouterDevtools />
    </div>
  ),

  notFoundComponent: () => <div>Not found Brother!</div>,
});
