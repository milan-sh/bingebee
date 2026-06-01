import { useQuery } from "@tanstack/react-query";
import { getVideosByChannel } from "@/api/video.api";

export const channelVideoListKey = (userId: string) =>
  ["channel-video-list", userId] as const;

export const useGetVideosByChannel = (userId?: string) => {
  return useQuery({
    queryKey: channelVideoListKey(userId ?? ""),
    queryFn: () => getVideosByChannel(userId as string),
    enabled: !!userId,
  });
};
