import { useMutation } from "@tanstack/react-query";
import { addVideoToWatchHistory } from "@/api/user.api";

export const useAddToWatchHistory = () => {
  return useMutation({
    mutationFn: (videoId: string) => addVideoToWatchHistory(videoId),
  });
};
