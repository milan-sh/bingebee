import { Link } from "react-router"
import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center py-1 md:p-1">
        <img src={logo} className="md:h-14 h-10" alt="logo" />
        <span className="text-accent font-semibold text-2xl md:text-3xl">BingeBee</span>
    </div>
    </Link>
  )
}

export default Logo