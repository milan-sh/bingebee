import type { Video } from "@/interfaces/video"
import {getChannelvideos} from "@/api/video"
import { requestHandler } from "@/utils";
import { TabsContent } from "@radix-ui/react-tabs"
import { useEffect, useState } from "react"
import { toast } from "sonner";
import LoadingSvg from "../LoadingSvg";
import { Play, Plus } from "lucide-react";
import { formatDuration } from "@/utils/durationFormat";
import { Link } from "react-router";
import { dateFormatter } from "@/utils/dateFormate";
import Button from "../Button";
import { useAuth } from "@/context/AuthCotext";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import VideoUploadDialog from "../VideoUploadDialog";

const VideoTab = ({channelId}:{channelId:string}) => {

    const {user} = useAuth();

    const [videos, setVideos] = useState<Video[] | null>(null);
    const [loading, setLoading] = useState(false)

    //fetching channel videos
    async function fetchChannelVideos(){
        await requestHandler(
            async ()=> await getChannelvideos(),
            setLoading,
            (res)=> setVideos(res.data),
            (err)=> toast.error(err || "something went wrong")
        )
    }

    useEffect(()=>{
        fetchChannelVideos()
    } ,[])

    if(loading){
        return (
            <TabsContent value="videos">
                <LoadingSvg/>
            </TabsContent>
        )
    }

    if(!videos){
        return (
            <TabsContent value="videos" className="flex flex-col items-center justify-center gap-2 py-4">
                <div className="flex items-center justify-center bg-primary p-2 rounded-full">
                    <Play/>
                </div>
                <h2 className="font-semibold text-gray-200">No videos Uploaded</h2>
                <p className="text-gray-200 max-w-96 text-center">This page has yet to upload a video. Search another page in order to find more videos.</p>
                {channelId===user?._id && (
                    <Dialog>
                        <DialogTrigger><div className="bg-primary px-4 py-2 text-black font-semibold flex items-center gap-2 mt-2"><Plus/> New Video </div></DialogTrigger>
                        <VideoUploadDialog/>
                    </Dialog>
                    
                )}
            </TabsContent>
        )
    }

  return (
    <TabsContent value="videos" className="grid md:grid-cols-2 gap-4 py-4">
        {videos.map((video)=>(
            <Link to={`/video/${video._id}`} key={video._id}>
                <div key={video._id} className="flex flex-col gap-1">
                    <div className="relative">
                        <img src={video.thumbnail} alt={video.title} className="h-64 w-full object-cover"/>
                        <p className="absolute bottom-2 right-2 text-white bg-black/95 px-2 rounded-sm">{formatDuration(video.duration)}</p>
                    </div>
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="leading-4 text-[14px]">{video.views} views · {dateFormatter(video.createdAt)}</p>
                </div>
            </Link>
        ))}
    </TabsContent>
  )
}

export default VideoTab
