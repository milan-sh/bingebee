import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVideoDetails } from "@/api/video.api";
import { toast } from "sonner";
import { channelVideosKey } from "./useGetChannelVideos";

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ videoId, data }: { videoId: string; data: FormData }) =>
      updateVideoDetails(data, videoId),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message ?? "Video updated successfully");
      queryClient.invalidateQueries({ queryKey: channelVideosKey.all });
    },
  });
};
