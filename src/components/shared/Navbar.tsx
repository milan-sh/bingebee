import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { Searchbar } from "./Searchbar";
import { ThemeToggle } from "./Themetoggle";
import logo from "../../assets/logo.png";
import { Loader2, LogOut, TextAlignJustify } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/user/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  const { mutate: logout, isPending } = useLogout();

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
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-accent-foreground">
                  {user?.fullName?.split(" ")[0][0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="center">
              <DropdownMenuLabel className="pb-2">My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link to="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/c/$username" params={{ username: user?.username }}>
                  Channel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <button
                  disabled={isPending}
                  onClick={() => logout()}
                  className="text-destructive"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin inline-flex mr-2" />
                      Logging out
                    </>
                  ) : (
                    <>
                      <LogOut
                        color="red"
                        className="inline-flex items-center mr-2"
                      />
                      Logout
                    </>
                  )}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
