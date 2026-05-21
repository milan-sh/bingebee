import { useQuery } from "@tanstack/react-query";
import { getChannelVideos } from "@/api/video.api";

export const channelVideosKey = {
  all: ["channel-videos"] as const,
};

export const useGetChannelVideos = () => {
  return useQuery({
    queryKey: channelVideosKey.all,
    queryFn: getChannelVideos,
  });
};
