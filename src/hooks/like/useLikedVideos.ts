import { useQuery } from "@tanstack/react-query";
import { getLikedVideos } from "@/api/like.api";
import { useUserStore } from "@/store/userStore";

export const likedVideosKey = ["liked-videos"] as const;

export const useLikedVideos = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: likedVideosKey,
    queryFn: getLikedVideos,
    enabled: isAuthenticated,
  });
};
