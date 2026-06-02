import type { ApiResponse } from "@/types/api.types";
import { apiClient } from "./index.api";

export type Video = {
  _id: string;
  title: string;
  videoFile: string;
  thumbnail: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
  owner: {
    _id: string;
    fullName: string;
    avatar: string;
    username: string;
  };
};

export const uploadVideo = async (
  videoData: FormData,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/video/", videoData, {
    timeout: 0,
  });
  return data;
};

export const getChannelVideos = async (): Promise<Video[]> => {
  const { data } = await apiClient.get("/dashboard/videos");
  return data.data;
};

export const deleteVideo = async (videoId: string): Promise<ApiResponse> => {
  const { data } = await apiClient.delete(`/video/${videoId}`);
  return data;
};

export const togglePublishVideo = async (
  videoId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/video/toggle/publish/${videoId}`);
  return data;
};

export const updateVideoDetails = async (
  updateData: FormData,
  videoId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/video/${videoId}`, updateData);
  return data;
};

export const getVideos = async (): Promise<Video[]> => {
  const { data } = await apiClient.get("/video/", {
    params: { page: 1, limit: 10 },
  });
  return data.data;
};

export const getVideosByChannel = async (
  channelId: string,
): Promise<Video[]> => {
  const { data } = await apiClient.get(`/video/videos/${channelId}`);
  return data.data;
};

export const getVideoById = async (videoId: string): Promise<Video> => {
  const { data } = await apiClient.get(`/video/${videoId}`);
  return data.data;
};

export const addViewToVideo = async (videoId: string): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/video/addView/${videoId}`);
  return data;
};
