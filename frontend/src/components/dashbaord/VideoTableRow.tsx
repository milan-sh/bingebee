import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { TableCell, TableRow } from "../ui/table";
import type { Video } from "@/interfaces/video";
import { sinceDateFormat } from "@/utils/sinceDateFormat";
import { Dialog, DialogFooter, DialogHeader } from "../ui/dialog";
import {
    DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import { requestHandler } from "@/utils";
import { deleteVideo } from "@/api/video";
import { useState } from "react";
import { toast } from "sonner";

const VideoTableRow = ({
  video,
  handlePublishToggle,
  fetchVideos,
}: {
  video: Video;
  handlePublishToggle: (videoId: string) => void;
  fetchVideos: () => void;
}) => {

    const [deleting, setDeleting] = useState(false);

    const handleDelete = async(videoId:string)=>{
        await requestHandler(
            async()=> await deleteVideo(videoId),
            setDeleting,
            ()=>{
                toast.success("Video deleted successfully.");
                fetchVideos();
            },
            (error)=>{
                toast.error(error || "Something went wrong.")
            }
        )
    }

  return (
    <TableRow>
      <TableCell>
        <Switch
          checked={video.isPublished}
          onCheckedChange={() => handlePublishToggle(video._id)}
        />
      </TableCell>
      <TableCell>
        <Badge
          variant={video.isPublished ? "secondary" : "destructive"}
          className="text-[16px]"
        >
          {video.isPublished ? "Published" : "Unpublished"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="w-full mx-auto flex gap-2 items-center">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-10 min-w-10 w-10 rounded-full object-cover object-top"
          />
          <h3 className="text-[16px] font-semibold">{video.title}</h3>
        </div>
      </TableCell>
      <TableCell>
        <div className="w-fit mx-auto flex items-center gap-2">
          <Eye className="text-primary" />
          <p className="text-lg">{video.views}</p>
        </div>
      </TableCell>
      <TableCell>
        <p className="text-lg">{sinceDateFormat(video.createdAt)}</p>
      </TableCell>
      <TableCell>
        <div className="w-fit mx-auto flex items-center gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <button className="cursor-pointer">
                <Trash2 size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-42 w-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-neutral-800 p-4 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg md:text-2xl font-semibold flex items-center gap-2"><Trash2 color="red"/> Delete Video</DialogTitle>
                <DialogDescription className="w-fit mb-6">
                  <span className="text-wrap">Are you sure you want to delete this video? Once its deleted,
                  you will not be able to recover it.</span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" className="text-gray-900 cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" className="cursor-pointer"
                onClick={()=>handleDelete(video._id)}
                >{deleting ? "Deleting..." : "Delete"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <button className="cursor-pointer">
            <Pencil size={20} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default VideoTableRow;
