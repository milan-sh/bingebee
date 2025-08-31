import { useAuth } from "@/context/AuthCotext";
import { Link } from "react-router";
import { BackgroungImg, Button, Loader } from "@/components";
import Avatar from "@/components/profile/Avatar";
import { requestHandler } from "@/utils";
import { useEffect, useState } from "react";
import type { UserInterface } from "@/interfaces/user";
import { getCurrentUserProfile } from "@/api/profile";
import { toast } from "sonner";

const EditProfile = () => {
  const [user, setUser]= useState<UserInterface | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function fetchUserProfile(){
      await requestHandler(
        async()=> await getCurrentUserProfile(),
        setLoading,
        (res)=>{
          setUser(res.data)
        },
        (err)=> toast.error(err || "something went wrong.")
      )
    }
    fetchUserProfile();
  }, [])

  if(loading){
    return <div><Loader/> </div>
  }

  return (
    <div className="min-h-screen w-full text-white mt-10 md:mt-0">
      {/* profile section */}
      {/* backgroundImg */}
      <BackgroungImg user={user}/>
      <div className="flex flex-col md:flex-row justify-between md:items-center px-4 mb-4">
        <div className="flex gap-4 items-center">
          {/* avatarImg */}
          <Avatar user={user}/>
          <div>
            <h1 className="text-lg md:text-2xl">{user?.fullName}</h1>
            <p className="text-sm text-gray-400">@{user?.username}</p>
          </div>
        </div>
        <Link to={`/channel/${user?._id}`}>
          <Button className="flex gap-2 items-center text-lg">
            View Channel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditProfile;
