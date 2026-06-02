import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/api/post.api";

export const userPostsKey = (userId: string) => ["user-posts", userId] as const;

export const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: userPostsKey(userId),
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });
};
