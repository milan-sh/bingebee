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
import { Button } from "@/components/ui/button";
import { requestHandler } from "@/utils";
import { deleteVideo, updateVideoDetails } from "@/api/video";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Input from "../Input";
import { useForm } from "react-hook-form";
import type { UpdateVideoFormValues } from "@/interfaces/form";

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
  const [updating, setUpdating] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(video.thumbnail);  

  const handleDelete = async (videoId: string) => {
    await requestHandler(
      async () => await deleteVideo(videoId),
      setDeleting,
      () => {
        toast.success("Video deleted successfully.");
        fetchVideos();
      },
      (error) => {
        toast.error(error || "Something went wrong.");
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UpdateVideoFormValues>({
    defaultValues:{
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
    }
  });

  useEffect(()=>{
    const subscription = watch((value, {name})=>{
      if(name==="thumbnail"){
        const file = value.thumbnail?.[0];
        if(file){
          if(file instanceof File){
            const previewUrl = URL.createObjectURL(file);
            setThumbnailPreview(previewUrl);
  
            //clearnup previous preview URL
            return () => URL.revokeObjectURL(previewUrl);            
          }
        }
      }
    })
    //cleanup
    return () => subscription.unsubscribe();
  }, [watch])

  const onSubmit = async(data:UpdateVideoFormValues)=>{

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    await requestHandler(
      async()=> await updateVideoDetails(video._id, formData),
      setUpdating,
      ()=>{
        toast.success("Video updated successfully.");
        fetchVideos();
      },
      (error) => {
        toast.error(error || "Something went wrong.");
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
            <DialogContent className="sm:max-w-[425px] md:h-42 w-80 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-4 rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg md:text-2xl font-semibold flex items-center gap-2">
                  <Trash2 color="red" /> Delete Video
                </DialogTitle>
                <DialogDescription className="w-fit mb-3 md:mb-6 text-left">
                  <span className="text-wrap">
                    Are you sure you want to delete this video? Once its
                    deleted, you will not be able to recover it.
                  </span>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-gray-900 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(video._id)}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <DialogTrigger asChild>
                <button className="cursor-pointer">
                  <Pencil size={20} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:h-[75vh] w-[95vw] md:w-2xl z-50 overflow-auto fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 p-4 rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg md:text-xl font-semibold">
                    Edit Video
                  </DialogTitle>
                  <DialogDescription className="text-[16px] text-gray-400">
                    Editing..{" "}
                    <strong className="font-semibold">{video.title}</strong>
                  </DialogDescription>
                </DialogHeader>
                <div className="my-4 text-[16px] text-start">
                  <label htmlFor="thumbnail">
                    Thumbnail*
                  </label>
                  <label 
                  className="relative mb-4 block cursor-pointer border border-dashed p-2 after:absolute after:inset-0 after:bg-transparent hover:after:bg-black/10"
                  htmlFor="thumbnail">
                    <input
                      type="file"
                      id="thumbnail"
                      className="sr-only"
                      accept="image/*"
                      {...register("thumbnail", {required: "Thumbnail is required", validate: files=>files && files?.length===1 || "Please upload 1 image"})}
                    />
                    <img src={thumbnailPreview} alt="Thumbnail Preview" className="mx-auto"/>
                  </label>
                  {errors.thumbnail && <p className="text-red-600 my-0.5">{errors.thumbnail.message as string}.</p>}
                  <Input 
                    type="text" 
                    label="Title*" 
                    {...register("title", {required:"Title is required.", minLength:{value:2, message:"Minimun 2 chars."}})}
                  />
                  {errors.title && <p className="text-red-600 my-0.5">{errors.title.message as string}.</p>}
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="description"
                  >
                    Description*
                  </label>
                  <textarea
                    id="description"
                    className="border w-full resize-none p-1 outline-none"
                    rows={4}
                    {...register("description", {required:"Video description is required.", minLength:{value:20, message:"Minimum 20 chars."}})}
                  />
                  {errors.description && <p className="text-red-600 my-0.5">{errors.description.message as string}.</p>}
                </div>
                <DialogFooter className="flex justify-between">
                  <DialogClose asChild>
                    <button className="cursor-pointer flex-1 border py-2 text-lg">
                      Cancel
                    </button>
                  </DialogClose>
                  <button 
                  type="submit"
                  disabled={updating}
                  className="cursor-pointer flex-1 border border-primary py-2 text-lg bg-primary text-black">
                    {updating ? "Updating..." : "Update"}
                  </button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default VideoTableRow;
