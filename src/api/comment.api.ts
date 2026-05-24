import { apiClient } from "./index.api";
import type { ApiResponse } from "@/types/api.types";
import { type Comment } from "@/schemas/comment.schema";

export const getVideoComments = async (videoId: string): Promise<Comment[]> => {
  const { data } = await apiClient.get(`/comments/${videoId}`);
  return data.data;
};

export const postComment = async (
  videoId: string,
  content: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post(`/comments/${videoId}`, { content });
  return data;
};

export const deleteComment = async (
  commentId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.delete(`/comments/${commentId}`);
  return data;
};

export const updateComment = async (
  commentId: string,
  content: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/comments/${commentId}`, { content });
  return data;
};
