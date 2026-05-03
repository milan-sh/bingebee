import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Searchbar } from "./Searchbar";
import { ThemeToggle } from "./Themetoggle";
import logo from "../../assets/logo.png";
import { TextAlignJustify } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-16 w-full flex items-center justify-between px-1 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <TextAlignJustify strokeWidth={2.5} size={26} />
        </SidebarTrigger>
        <img src={logo} alt="Logo" className="h-7 md:h-8" />
      </div>
      <Searchbar />
      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden md:block">Sign Up</Button>
        <Button className="mr-2">Login</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
