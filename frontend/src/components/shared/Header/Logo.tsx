import logo from "../../../assets/logo.png"
import { Link } from "react-router"

const Logo = () => {
  return (
    <Link to="/" className="w-fit flex items-center justify-between">
        <img className="md:h-16 h-10" src={logo} alt="bingebee-logo" /> <span className="md:text-4xl text-2xl font-semibold">BingeBee</span>
    </Link>
  )
}

export default Logo