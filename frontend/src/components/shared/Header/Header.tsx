import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import { MoveRight } from "lucide-react"

const Header = () => {
  return (
    <nav className="px-3 pt-6 pb-4 md:px-8 md:pb-2 flex items-center justify-between border-b border-gray-700">
        <Logo/>
        <Button size={"lg"} variant={"outline"} className="bg-transparent cursor-pointer text-lg py-5 hover:bg-primary hover:text-white flex itece">Get started <span><MoveRight size="50"/></span></Button>
    </nav>
  )
}

export default Header