import { Button } from "../ui/button";
import { Searchbar } from "./Searchbar";
import { ThemeToggle } from "./Themetoggle";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between p-2">
      <h1 className="font-medium text-xl">BingeBee</h1>
      <Searchbar />
      <div className="flex items-center gap-2">
        <Button variant="outline">Sign Up</Button>
        <Button className="mr-2">Login</Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
