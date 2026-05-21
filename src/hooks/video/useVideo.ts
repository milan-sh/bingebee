import { useQuery } from "@tanstack/react-query";
import { getVideoById } from "@/api/video.api";

export const videoKeys = {
  detail: (videoId: string) => ["video", videoId] as const,
};

export const useVideo = (videoId: string) => {
  return useQuery({
    queryKey: videoKeys.detail(videoId),
    queryFn: () => getVideoById(videoId),
    enabled: !!videoId,
  });
};
