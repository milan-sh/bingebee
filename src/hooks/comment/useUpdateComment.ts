import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateComment } from "@/api/comment.api";
import { videoCommentsKey } from "./useVideoComments";

export const useUpdateComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: videoCommentsKey(videoId),
      });
      toast.success("Comment updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update comment");
    },
  });
};
