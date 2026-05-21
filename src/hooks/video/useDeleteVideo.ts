import { useMutation } from "@tanstack/react-query";
import { deleteVideo } from "@/api/video.api";
import { toast } from "sonner";
import { channelVideosKey } from "./useGetChannelVideos";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => deleteVideo(videoId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Video deleted successfully");
      queryClient.invalidateQueries({ queryKey: channelVideosKey.all });
    },
  });
};
