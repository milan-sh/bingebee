import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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
          className="md:w-52 w-36 bg-accent-foreground p-2 border border-neutral-700"
          align="end"
        >
          <DropdownMenuLabel className="font-semibold mb-2">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary-foreground py-1 px-0.5 rounded-md">
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary-foreground py-1 px-0.5 rounded-md">
              <Link to={`/channel/${user?._id}`}>Channel</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => logout()} className="cursor-pointer hover:bg-secondary-foreground py-1 px-0.5 rounded-md text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;
