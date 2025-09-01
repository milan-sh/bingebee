import { TabsContent } from "@/components/ui/tabs";
import LoadingSvg from "../LoadingSvg";
import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import type { Playlist } from "@/interfaces/playlist";
import { requestHandler } from "@/utils";
import { getAllPlaylist } from "@/api/playlist";
import { toast } from "sonner";
import { dateFormatter } from "@/utils/dateFormate";
import noVideo from "@/assets/noVideo.jpg"

const PlaylistTab = ({channelId}:{channelId:string}) => {
    const [playLists, setPlaylists] = useState<Playlist[] | null>(null)
    const [loading, setLoading] = useState(false)

    async function fetchChannelPlaylists(){
        await requestHandler(
            async()=> await getAllPlaylist(channelId),
            setLoading,
            (res)=> {
                setPlaylists(res.data);
            },
            (err)=> toast.error(err || "something went wrong.")
        )
    }

    useEffect(()=>{
        if(channelId){
            fetchChannelPlaylists();
        }
    }, [channelId])

    if(loading){
        return (
            <TabsContent value="videos">
                <LoadingSvg/>
            </TabsContent>
        )
    }

    if(!playLists || playLists.length === 0){
        return (
            <TabsContent value="playlists" className="flex flex-col items-center justify-center gap-2 py-4">
                <div className="flex items-center justify-center bg-primary p-2 rounded-full">
                    <Folder/>
                </div>
                <h2 className="font-semibold text-gray-200">No playlist created</h2>
                <p className="text-gray-200 max-w-96 text-center">There are no playlist created on this channel.</p>
            </TabsContent>
        )
    }
  return (
    <TabsContent value="playlists" className="grid md:grid-cols-2 gap-4 py-4">
        {playLists.map((playlist)=>(
            <div key={playlist._id} className="flex flex-col">
                <div className="relative mb-2">
                    <img src={playlist.videos[playlist.videos.length - 1]?.thumbnail ?? noVideo} alt="" className="h-64 w-full object-cover"/>
                    <div className="absolute bottom-0 inset-x-0 flex justify-between bg-black/30 backdrop-blur-xs p-4">
                        <div>
                            <p>Playlist</p>
                            <p>{dateFormatter(playlist.createdAt)}</p>
                        </div>
                        <p>{playlist.videos.length || 0} videos</p>
                    </div>
                </div>
                <h3 className="font-semibold text-gray-200">{playlist.name}</h3>
                <p className="text-gray-200 text-[14px]">{playlist.description}</p>
            </div>
        ))}
    </TabsContent>
  )
}

export default PlaylistTab
