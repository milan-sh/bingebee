import {Copyright, Github, Linkedin, Twitter} from "lucide-react"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="bg-black text-white flex items-center justify-between text-sm md:text-lg font-semibold pt-8 pb-4 px-4">
      <div className="flex items-center gap-x-1">
        <Copyright style={{width:"1em", height:"1em"}}/>
        <span>{new Date().getFullYear()} BingeBee. All rights reserved.</span>
      </div>
      <div className="flex justify-between items-center md:gap-x-4 gap-x-2">
        <Link to="https://github.com/milan-sh" target="_blank" className="hover:text-gray-400">
          <Github style={{width:"1.3em", height:"1.3em"}} />
        </Link>
        <Link to="https:/x.com/dev_81milan" target="_blank" className="hover:text-gray-400">
          <Twitter style={{width:"1.3em", height:"1.3em"}} />
        </Link>
        <Link to="https://www.linkedin.com/in/milan-singh-81ms33/" target="_blank" className="hover:text-gray-400">
          <Linkedin style={{width:"1.3em", height:"1.3em"}} />
        </Link>
      </div>
    </footer>
  )
}

export default Footer