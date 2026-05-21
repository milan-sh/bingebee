import { useQuery } from "@tanstack/react-query";
import { getVidoes } from "@/api/video.api";

export const useVideosKeys = {
  all: ["videos"] as const,
};

export const useVideos = () => {
  return useQuery({
    queryKey: useVideosKeys.all,
    queryFn: getVidoes,
  });
};
