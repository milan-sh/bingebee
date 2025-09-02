import { Input } from "@/components";
import React, { useState } from "react";
import { toast } from "sonner";

const Support = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null)
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleClick =(e:React.MouseEvent<HTMLButtonElement>)=>{
    if(email.trim() === "") return;
    if(!emailRegex.test(email)){
      setError("Please enter a valid email address.")
      return;
    }
    e.preventDefault();
    toast.success("We'll notify you soon.")
    setEmail("")
    setError("")
  }

  return (
    <div className="w-full text-white p-4 mt-6 flex flex-col items-center">
      <h1 className="md:text-6xl text-4xl font-bold mt-12 bg-gradient-to-r from-red-500 via-accent to-primary bg-clip-text text-transparent p-5">
        Coming Soon
      </h1>
      <p className="text-sm md:text-base font-medium mb-8 text-center max-w-96">
        Drop your email below and we'll send you a notification when service is
        live.
      </p>
      <div className="flex md:flex-row flex-col items-center gap-2 md:w-xl w-[80vw] bg-neutral-800 p-4 rounded-sm">
        <Input
          type="email"
          className="border-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please enter your email address"
        />
        <button 
        onClick={handleClick}
        className="bg-accent md:min-w-32 min-w-20 text-black px-4 flex-1 md:py-2.5 py-1 cursor-pointer hover:bg-primary font-semibold self-end">
          Notify Me
        </button>
      </div>
      {error && <p className="text-red-600 mt-2 text-left">{error}</p>}
    </div>
  );
};

export default Support;
