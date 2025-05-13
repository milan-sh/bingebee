import logo from "../../../assets/logo.png"

const Logo = () => {
  return (
    <div className="w-fit flex items-center justify-between">
        <img className="md:h-16 h-10" src={logo} alt="bingebee-logo" /> <span className="md:text-4xl text-2xl font-semibold">BingeBee</span>
    </div>
  )
}

export default Logo