import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VideoTableRow from "./VideoTableRow";
import {useSidebar} from "@/components/ui/sidebar"
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils";
import { getChannelVideos } from "@/api/dashboard";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import LoadingSvg from "../LoadingSvg";

const VideosTable = () => {
    
    const headers = ["Status", "Status", "Uploaded", "Views", "Date Uploaded", "Manage"];

    const { open, toggleSidebar } = useSidebar();

    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<Video[] | null>(null);

    useEffect(()=>{
        if(open){
            toggleSidebar();
        }
    }, [])

    useEffect(()=>{
        async function fetchVideos() {
            await requestHandler(
                async ()=> await getChannelVideos(),
                setLoading,
                (res)=>{
                    setVideos(res.data);
                },
                (error)=>{
                    toast.error(error || "Something went wrong.")
                }
            )
        }

        fetchVideos();
    }, [])

    if(loading){
        return <div><LoadingSvg/></div>
    }

  return (
    <div className="border overscroll-auto">
        <Table>
          <TableHeader>
            <TableRow>
                {headers.map((header, index) => (
                  <TableHead className="text-lg" key={index}>{header}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Table rows will go here */}
            {videos && videos.map((video) => (
              <VideoTableRow key={video._id} video={video} />
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

export default VideosTable
