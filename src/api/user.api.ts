import { apiClient } from "./index.api";
import { type ApiResponse } from "@/types/api.types";

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
