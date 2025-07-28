import logo from "../assets/logo.png"

const Logo = () => {
  return (
    <div className="flex items-center p-2 md:p-1">
        <img src={logo} className="md:h-14 h-12" alt="logo" />
        <span className="text-primary font-semibold md:text-3xl text-2xl">BingeBee</span>
    </div>
  )
}

export default Logo