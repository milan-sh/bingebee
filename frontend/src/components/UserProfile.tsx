import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "./ui/dropdown-menu";
import { useAuth } from "../context/AuthCotext";
import { Link } from "react-router";

const UserProfile = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user?.avatar}
            alt={user?.fullName}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="md:w-52 w-40 top-2 bg-accent-foreground rounded-none p-2 border text-white text-lg border-gray-400 "
          align="end"
        >
          <DropdownMenuLabel className="font-semibold p-0 pb-2 md:text-lg">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer hover:bg-primary font-semibold">
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-primary font-semibold">
              <Link to={`/c/${user?.username}`}>Channel</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer hover:bg-red-600 hover:text-white text-red-500 font-semibold">
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
