import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePublishVideo } from "@/api/video.api";
import { toast } from "sonner";
import { channelVideosKey } from "./useGetChannelVideos";

export const useToggleVideoStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (videoId: string) => togglePublishVideo(videoId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: channelVideosKey.all });
      toast.success("Video status updated successfully");
    },
  });
  return mutation;
};
