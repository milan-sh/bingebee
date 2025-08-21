import {Navbar, Footer} from "../components/index"
import { Outlet } from "react-router"
import {SidebarTrigger, SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/App-Sidebar"
import {Toaster} from "sonner"

const MainLayout = () => {
  return (
    <>
        <Navbar/>
        <main className="w-full bg-black">
            <SidebarProvider className="relative">
              <Toaster/>
                <AppSidebar/>
                <SidebarTrigger className="text-white ml-4 mt-2 md:hidden absolute top-0"/>
                <Outlet/>
            </SidebarProvider>
        </main>
        <Footer/>
    </>
  )
}

export default MainLayout