import { useAuth } from "@/context/AuthCotext"
import { CloudUpload } from "lucide-react";

const Avatar = () => {

    const {user} = useAuth();

  return (
    <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.fullName}
              className="h-28 min-w-28 -translate-y-7 rounded-full object-cover border-2"
            />
            <button className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/50 p-2 rounded-full cursor-pointer">
              <CloudUpload />
            </button>
          </div>
  )
}

export default Avatar
