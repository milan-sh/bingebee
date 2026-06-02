import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { togglePostLike } from "@/api/like.api";
import type { Post } from "@/schemas/post.schema";
import { userPostsKey } from "./useUserPosts";

export const useTogglePostLike = (userId: string) => {
  const queryClient = useQueryClient();
  const key = userPostsKey(userId);

  return useMutation({
    mutationFn: (postId: string) => togglePostLike(postId),
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<Post[]>(key);

      queryClient.setQueryData<Post[]>(key, (posts) =>
        posts?.map((post) =>
          post._id === postId ? { ...post, isLiked: !post.isLiked } : post,
        ),
      );

      return { previous };
    },
    onError: (error, _postId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(key, context.previous);
      }
      toast.error(error.message || "Failed to update like");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};
