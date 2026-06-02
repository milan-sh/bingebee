import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePost } from "@/api/post.api";
import { userPostsKey } from "./useUserPosts";

export const useUpdatePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      updatePost(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userPostsKey(userId) });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update post");
    },
  });
};
