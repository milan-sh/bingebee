import { apiClient } from "./index.api";
import { type ApiResponse } from "@/types/api.types";
import { type User } from "@/types/user.types";
import type { Video } from "./video.api";

export const addVideoToWatchHistory = async (
  videoId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/users/history/${videoId}`);
  return data;
};

export const getWatchHistory = async (): Promise<Video[]> => {
  const { data } = await apiClient.get("/users/history");
  return data.data;
};

export const sendFeedback = async (feedback: string): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/users/feedback", {
    feedback: feedback,
  });
  console.log(data)
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

export const updateAccountDetails = async (updateData: {
  fullName: string;
  email: string;
}): Promise<ApiResponse<{ user: User }>> => {
  const { data } = await apiClient.patch("/users/update-account", updateData);
  return data;
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/users/change-password", payload);
  return data;
};

export const getUserHistory = async (): Promise<Video[]> => {
  const { data } = await apiClient.get("/users/history");
  return data.data;
};
