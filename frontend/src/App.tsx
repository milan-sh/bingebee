import { Outlet } from "react-router";
import { Navbar, Footer } from "./components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/App-Sidebar";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="w-full md:min-h-[80vh] bg-black grid md:grid-cols-4">
        <SidebarProvider>
            <AppSidebar />
          <div className="h-fit md:col-span-3">
            <SidebarTrigger className="text-white ml-4 mt-2 md:hidden"/>
            <Outlet />
          </div>
        </SidebarProvider>
      </main>
      <Footer />
    </>
  );
};

export default App;
