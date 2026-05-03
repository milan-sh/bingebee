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
          <header className="fixed top-0 inset-x-0 z-50 h-16 bg-background border-b">
            <Navbar />
          </header>
          <AppSidebar />
          <div className="flex flex-1 flex-col mt-16 min-h-[calc(100svh-4rem)]">
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
