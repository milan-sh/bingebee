import { apiClient } from "./index.api";
import { type ApiResponse } from "@/types/api.types";
import { type User } from "@/types/user.types";

export const addVideoToWatchHistory = async (
  videoId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/users/history/${videoId}`);
  return data;
};

export const getWatchHistory = async (): Promise<ApiResponse> => {
  const { data } = await apiClient.get("/users/history");
  return data;
};

export const sendFeedback = async (feedback: string): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/users/feedback", {
    feedback: feedback,
  });
  return data;
};

export const updateAvatar = async (
  file: File,
): Promise<ApiResponse<{ user: User }>> => {
  const fd = new FormData();
  fd.append("avatar", file);
  const { data } = await apiClient.patch("/users/avatar", fd);
  return data;
};

export const updateCoverImage = async (
  file: File,
): Promise<ApiResponse<{ user: User }>> => {
  const fd = new FormData();
  fd.append("coverImage", file);
  const { data } = await apiClient.patch("/users/cover-image", fd);
  return data;
};
