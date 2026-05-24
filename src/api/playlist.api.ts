import { apiClient } from "./index.api";
import type { ApiResponse } from "@/types/api.types";
import type { Playlist } from "@/schemas/playlist.schema";

export const createPlaylist = async (
  name: string,
  description: string,
): Promise<ApiResponse<Playlist>> => {
  const { data } = await apiClient.post("/playlists", { name, description });
  return data;
};

export const userPlaylists = async (userId: string): Promise<Playlist[]> => {
  const { data } = await apiClient.get(`/playlists/user/${userId}`);
  return data.data;
};

export const addToPlaylist = async (
  videoId: string,
  playlistId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(
    `/playlists/add/${videoId}/${playlistId}`,
  );
  return data;
};

export const removeFromPlaylist = async (
  videoId: string,
  playlistId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.patch(
    `/playlists/remove/${videoId}/${playlistId}`,
  );
  return data;
};
