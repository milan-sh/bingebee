import type { ApiResponse } from "@/types/api.types";
import { apiClient } from "./index.api";

type isLiked = {
  isLiked: boolean;
};

export type LikedVideo = {
  _id: string;
  title: string;
  thumbnail: string;
  videoFile: string;
  duration: number;
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

export const togglePostLike = async (postId: string): Promise<ApiResponse> => {
  const { data } = await apiClient.post(`/like/toggle/t/${postId}`);
  return data;
};

export const getLikedVideos = async (): Promise<LikedVideo[]> => {
  const { data } = await apiClient.get("/like/videos");
  return data.data;
};
