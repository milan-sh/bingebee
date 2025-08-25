import type { Video } from "@/interfaces/video";
import { useEffect, useState } from "react";
import LoadingSvg from "./LoadingSvg";
import { requestHandler } from "@/utils";
import { getPublicVideos } from "@/api/video";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api";
import { toast } from "sonner";
import { dateFormatter } from "@/utils/dateFormate";
import { Link } from "react-router";
import { formatDuration } from "@/utils/durationFormat";


const VideosListView = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    await requestHandler (
      async ()=> await getPublicVideos(),
      setLoading,
      (resData:FreeAPISuccessResponseInterface)=>{
        setVideos(resData.data);
      },
      (error) => {
        toast.error(error || "something went wrong");
      }
    )
  }

  useEffect(()=>{
    fetchVideos()
  }, [])

  if(loading) return <div className="flex items-center justify-center md:col-span-2 bg-neutral-950"><LoadingSvg/></div>
  if(!videos) return <div className="flex items-center justify-center md:col-span-2 bg-neutral-950">No videos found</div>;
  
  return (
    <div className="md:px-2 flex flex-col gap-4 md:col-span-2 mt-2 md:mt-0">
      {videos.map((video)=>(
        <Link to={`/video/${video._id}`} key={video._id}>
          <div key={video._id} className="border w-full grid grid-cols-1 md:grid-cols-7 gap-2">
          <div className="relative md:col-span-3">
            <img src={video.thumbnail} alt={video.title} className="w-full h-44 md:h-24 object-cover" />
            <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-sm px-2 py-0.5 rounded">{formatDuration(video.duration)}</span>
          </div>
          <div className="md:col-span-4 p-2 md:p-0">
            <h4 className="text-[15px] font-semibold">{video.title}</h4>
            <p className="mt-4 text-neutral-200 text-sm">{video.owner.fullName}</p>
            <p className="text-neutral-200 text-sm">{video.views} Views · {dateFormatter(video.createdAt)}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
  )
}

export default VideosListView

