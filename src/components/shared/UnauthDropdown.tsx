import { Link } from "@tanstack/react-router";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type UnauthDropdownProps = {
  title: string;
  description: string;
};

const UnauthDropdown = ({ title, description }: UnauthDropdownProps) => {
  return (
    <DropdownMenuContent className="w-80 py-3 px-4 text-center">
      <h2 className="p-2 font-semibold">{title}</h2>
      <p className="p-2 text-sm text-muted-foreground">{description}</p>

      <Link to={"/login"}>
        <Button className="w-full rounded-full font-medium">Login</Button>
      </Link>
    </DropdownMenuContent>
  );
};

export default UnauthDropdown;
