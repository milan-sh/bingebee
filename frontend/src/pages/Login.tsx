import {Logo} from "../components/shared/index"
import { Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Login = () => {
  return (
    <div className="bg-gradient-to-b from-secondary to-primary min-h-screen text-white flex flex-col items-center justify-center">
        <Logo/>
        <div className="md:w-2xl w-[80%] flex flex-col justify-start items-center gap-8 mt-16 p-8 shadow-md border-[1px] rounded-lg backdrop-blur-3xl">
            <h1 className="inline-flex justify-between items-center md:gap-x-5 gap-x-3 md:text-4xl text-2xl font-medium text-gray-300 md:mb-8 mb-4"><Lock className="md:h-10 md:w-10 h-7 w-7"/> Login</h1>
            <Input className="text-xl" placeholder="username"/>
            <Input className="text-xl" placeholder="password"/>
            <Button className="w-full cursor-pointer text-lg py-5 bg-accent hover:bg-secondary">Demo Login</Button>
            <Button className="w-full cursor-pointer text-lg py-5 hover:bg-secondary">Log in</Button>
        </div>
    </div>
  )
}

export default Login