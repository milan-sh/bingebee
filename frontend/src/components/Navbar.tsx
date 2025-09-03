import Logo from "./Logo";
import { Search } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthCotext";
import UserProfile from "./UserProfile";
import Input from "./Input";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-1 px-3 md:px-4 bg-black text-white border-b-[1px]">
      <Logo />
      {user && (
        <div className="hidden w-96 md:flex items-center md:gap-x-2 border px-4">
        <Search size={20} />
        <Input
        type="text"
        className="w-full border-none h-9"
        placeholder="Search for movies, series, or genres"
        />
      </div>
      )}
      {user ? (
        <div className="flex items-end justify-between gap-x-6">
          <Search className="md:hidden" size={30} />
          <UserProfile />
        </div>
      ) : (
        <div className="flex justify-between items-center gap-x-6">
          <Link to="/login">
            <button className="hover:bg-secondary-foreground p-2 cursor-pointer">
              Log in
            </button>
          </Link>
          <div className="relative">
            <Link to="/signup">
              <button className="relative font-semibold bg-primary text-black hover:text-white md:text-lg py-1 px-3 cursor-pointer z-30">
                Sign up
              </button>
            </Link>
            <div className="absolute md:left-3 left-1 top-1 md:h-9 h-8 w-20 bg-gray-600 z-10"></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
