import { apiClient } from "./index.api";

type ChannelStatsResponseType = {
  totalCommentLike: number;
  totalVideoLikes: number;
  totalTweetLike: number;
  totalVideos: number;
  totalSubscribers: number;
  toatalViews: number;
};

export const getChannelStats = async (): Promise<ChannelStatsResponseType> => {
  const { data } = await apiClient.get("/dashboard/stats");
  return data.data;
};
