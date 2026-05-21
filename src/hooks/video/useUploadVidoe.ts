import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadVideo } from "@/api/video.api";
import { toast } from "sonner";
import { channelVideosKey } from "./useGetChannelVideos";

export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => uploadVideo(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: channelVideosKey.all });
    },
  });
};
