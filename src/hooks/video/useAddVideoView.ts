import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addViewToVideo } from "@/api/video.api";
import { videoKeys } from "./useVideo";

export const useAddVideoView = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => addViewToVideo(videoId),
    onSuccess: (_data, videoId) => {
      queryClient.invalidateQueries({
        queryKey: videoKeys.detail(videoId),
      });
    },
  });
};
