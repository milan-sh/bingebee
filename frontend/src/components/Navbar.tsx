import Logo from "./Logo"
import { Menu, Search } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-1 px-3 md:px-6">
        <Logo/>
        <div className="hidden flex items-center justify-between gap-x-6">
            <Search size={30} />
            <Menu size={30}/>
        </div>
        <div className="flex justify-between items-center gap-x-6">
            <button className="hover:bg-secondary-foreground p-2 cursor-pointer">Log in</button>
            <div className="relative">
                <button className="relative font-semibold bg-primary text-black hover:text-white text-lg py-1 px-3 cursor-pointer z-30">Sign up</button>
                <div className="absolute left-3 top-1 h-9 w-20 bg-white z-10"></div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar