import { useQuery } from "@tanstack/react-query";
import { getVideos } from "@/api/video.api";

export const useVideosKeys = {
  all: ["videos"] as const,
};

export const useVideos = (query?: string) => {
  return useQuery({
    queryKey: [...useVideosKeys.all, query],
    queryFn: () => getVideos(query),
  });
};
