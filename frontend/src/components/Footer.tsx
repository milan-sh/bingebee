import {Copyright, Github, Linkedin, Twitter} from "lucide-react"
import { Link } from "react-router"

const Footer = () => {
  return (
    <div className="bg-black text-white flex items-center justify-between text-lg font-semibold p-4">
      <div className="flex items-center gap-x-2">
        <Copyright />
        <span>{new Date().getFullYear()} BingeBee. All rights reserved.</span>
      </div>
      <div className="flex justify-between items-center gap-x-4">
        <Link to="https://github.com/milan-sh" target="_blank" className="hover:text-gray-400">
          <Github size={25}/>
        </Link>
        <Link to="https:/x.com/dev_81milan" target="_blank" className="hover:text-gray-400">
          <Twitter size={25}/>
        </Link>
        <Link to="https://www.linkedin.com/in/milan-singh-81ms33/" target="_blank" className="hover:text-gray-400">
          <Linkedin size={25} />
        </Link>
      </div>
    </div>
  )
}

export default Footer