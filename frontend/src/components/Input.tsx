import {useId} from "react"
import type {InputProps} from "../interfaces/form"

const Input = ({label, type="text", className="", ...props}:InputProps) => {

    const id = useId()
  return (
    <div className="w-full flex flex-col gap-y-1">
        {label && 
        <label htmlFor={id} className="font-semibold inline-block mb-0.5">
            {label}
        </label>
        }
        <input
        id={id}
        type={type}
        className={`text-white p-2 outline-none border border-white mb-1 w-full ${className}`}
        {...props}
        />
    </div>
  )
}

export default Input