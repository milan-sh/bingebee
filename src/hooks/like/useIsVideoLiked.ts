import { useQuery } from "@tanstack/react-query";
import { isVideoLiked } from "@/api/like.api";
import { useUserStore } from "@/store/userStore";

export const videoLikeKey = (videoId: string) =>
  ["video-like", videoId] as const;

export const useIsVideoLiked = (videoId: string) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: videoLikeKey(videoId),
    queryFn: () => isVideoLiked(videoId),
    enabled: !!videoId && isAuthenticated,
  });
};
