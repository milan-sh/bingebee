import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost } from "@/api/post.api";
import { userPostsKey } from "./useUserPosts";

export const useCreatePost = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createPost(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userPostsKey(userId) });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post");
    },
  });
};
