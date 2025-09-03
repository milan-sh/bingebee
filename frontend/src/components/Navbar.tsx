import Logo from "./Logo";
import { Cross, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthCotext";
import UserProfile from "./UserProfile";
import Input from "./Input";
import type React from "react";
import { useState } from "react";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim() === "") return;
      navigate(`/search/${query}`);
    }
  };

  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-1 px-3 md:px-4 bg-black text-white border-b-[1px]">
      <Logo />
      {user && (
        <div className="hidden w-96 md:flex items-center md:gap-x-2 border px-4">
          <Search size={20} />
          <Input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full border-none h-9"
            placeholder="Search"
          />
        </div>
      )}
      {user ? (
        <div className="flex items-center justify-between gap-x-2">          
            {isOpen ? (
              <div className="md:hidden absolute top-0.5 left-2 bg-black flex items-center my-2">
                <Input
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="min-w-80 border rounded-sm"
                  placeholder="Search"
                />
                <button onClick={() => setIsOpen(!isOpen)}><X size={30} className="ml-2"/></button>
              </div>
            ) : (
              <button onClick={() => setIsOpen(!isOpen)}><Search className="md:hidden" size={30} /></button>
            )}
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
