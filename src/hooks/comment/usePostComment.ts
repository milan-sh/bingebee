import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postComment } from "@/api/comment.api";
import { videoCommentsKey } from "./useVideoComments";

export const usePostComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postComment(videoId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: videoCommentsKey(videoId),
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to post comment");
    },
  });
};
