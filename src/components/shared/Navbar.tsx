import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Searchbar } from "./Searchbar";
import { ThemeToggle } from "./Themetoggle";
import logo from "../../assets/logo.png";
import { TextAlignJustify } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  return (
    <nav className="h-16 w-full flex items-center justify-between px-1 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <TextAlignJustify strokeWidth={2.5} size={26} />
        </SidebarTrigger>
        <img src={logo} alt="Logo" className="h-7 md:h-8" />
      </div>
      <Searchbar />
      {!isAuthenticated && (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate({ to: "/signup" })}
            variant="ghost"
            className="hidden md:flex font-semibold cursor-pointer"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate({ to: "/login" })}
            className="font-semibold px-5 cursor-pointer"
          >
            Login
          </Button>
          <ThemeToggle />
        </div>
      )}

      {isAuthenticated && (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-accent-foreground">
              {user?.fullName?.split(" ")[0][0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
