import { apiClient } from "./index.api";
import type { ApiResponse } from "@/types/api.types";
import type { Post } from "@/schemas/post.schema";

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  const { data } = await apiClient.get(`/tweet/user/${userId}`);
  return data.data;
};

export const createPost = async (content: string): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/tweet", { content });
  return data;
};

export const updatePost = async (
  postId: string,
  content: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(`/tweet/${postId}`, { content });
  return data;
};

export const deletePost = async (postId: string): Promise<ApiResponse> => {
  const { data } = await apiClient.delete(`/tweet/${postId}`);
  return data;
};
