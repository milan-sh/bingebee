import { Outlet } from "react-router"
import {Navbar, Footer} from "../components/index"

const AuthLayout = () => {
  return (
    <div className="bg-black">
        <Navbar/>
        <main className="max-w-xl mx-auto px-4 py-8 min-h-[80vh]">
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AuthLayout