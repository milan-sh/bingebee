import type { ApiResponse } from "@/types/api.types";
import { apiClient } from "./index.api";

type isLiked = {
  isLiked: boolean;
};

export const isVideoLiked = async (videoId: string): Promise<isLiked> => {
  const { data } = await apiClient.get(`/like/status/v/${videoId}`);
  return data.data;
};

export const toggleVideoLike = async (
  videoId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post(`/like/toggle/v/${videoId}`);
  return data;
};
