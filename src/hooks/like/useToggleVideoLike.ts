import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleVideoLike } from "@/api/like.api";
import { videoLikeKey } from "@/hooks/like/useIsVideoLiked";
import { toast } from "sonner";

export const useToggleVideoLike = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleVideoLike(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: videoLikeKey(videoId),
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update like");
    },
  });
};
