import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Searchbar } from "./Searchbar";
import { ThemeToggle } from "./Themetoggle";
import logo from "../../assets/logo.png";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Menu/>
        </SidebarTrigger>
        <img src={logo} alt="Logo" className="h-9" />
      </div>
      <Searchbar />
      <div className="flex items-center gap-3">
        <Button variant="outline">Sign Up</Button>
        <Button className="mr-2">Login</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
