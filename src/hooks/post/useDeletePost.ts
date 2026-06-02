import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePost } from "@/api/post.api";
import { userPostsKey } from "./useUserPosts";

export const useDeletePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userPostsKey(userId) });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });
};
