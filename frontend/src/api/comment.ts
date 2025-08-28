import { apiClient } from "./axios";

function getCommentsByVideoId(videoId: string) {
  return apiClient.get(`/comments/${videoId}`);
}

function addComment(videoId: string, content: string) {
  return apiClient.post(`/comments/${videoId}`, { content });
}

export { getCommentsByVideoId, addComment };