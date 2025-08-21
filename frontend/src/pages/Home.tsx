import { useEffect, useState } from "react"
import {getPublicVideos} from "../api/video.ts"
import {requestHandler} from "../utils/index.ts"
import type { Video } from "@/interfaces/video.ts"
import Loader from "@/components/Loader.tsx"
import { CirclePlay } from "lucide-react"
import {toast} from "sonner"


const Home = () => {

  const [loading, setLoading] = useState(false)
  const [videosList, setVideosList] = useState<Video[]>([])


  useEffect(()=>{
    const fetchVideos = async()=>{
      await requestHandler(
        async()=> await getPublicVideos(),
        setLoading,
        (res:any)=>{
          setVideosList(res.data);
        },
        (errMsg)=>{
          toast.error(errMsg || "Failed to fetch videos");
        }
      )
    }
    fetchVideos();
  }, [])

  // If loading, display a loader
  if(loading) return <div className="flex justify-center items-center h-screen"><Loader/></div>
  // If no videos are available, display a message
  if(!loading && videosList.length === 0) return <div className="flex flex-col justify-center items-center gap-y-2 h-screen w-full text-white ">
    <CirclePlay className="text-primary" size={44}/>
    <p className="font-semibold md:text-lg">No videos available.</p>
  </div>

  return (
    <div className="bg-black text-white py-2 px-4">
        <p>Videos</p>
        <button>Toast</button>
    </div>
  )
}

export default Home