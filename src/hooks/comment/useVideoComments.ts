import { useQuery } from "@tanstack/react-query";
import { getVideoComments } from "@/api/comment.api";

export const videoCommentsKey = (videoId: string) =>
  ["video-comments", videoId] as const;

export const useVideoComments = (videoId: string) => {
  return useQuery({
    queryKey: videoCommentsKey(videoId),
    queryFn: () => getVideoComments(videoId),
    enabled: !!videoId,
  });
};
