import { Button } from "@/components/ui/button"
import Logo from "./Logo"

const Header = () => {
  return (
    <nav className="px-3 pt-6 pb-4 md:px-8 md:pb-2 flex items-center justify-between border-b border-gray-700">
        <Logo/>
        <div className="flex items-center justify-between gap-x-4">
          <Button className="md:text-lg py-4 px-6" variant={"outline"}>Signup</Button>
          <Button className="md:text-lg py-4 px-6 bg-accent cursor-pointer" >Login</Button>
        </div>
    </nav>
  )
}

export default Header