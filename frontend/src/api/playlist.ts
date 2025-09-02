import { apiClient } from "./axios";

function createPlaylist(data: { name: string; description: string }) {
  return apiClient.post("/playlists/", data);
}

function getAllPlaylist(userId:string){
    return apiClient.get(`/playlists/user/${userId}`);
}

function addVideoToPlaylist(playlistId:string, videoId:string){
    return apiClient.patch(`/playlists/add/${videoId}/${playlistId}`);
}

function removeVideoFromPlaylist(playlistId:string, videoId:string){
    return apiClient.patch(`/playlists/remove/${videoId}/${playlistId}`);
}

function deletePlaylist(playlistId:string){
    return apiClient.delete(`/playlists/${playlistId}`)
}

export { createPlaylist, getAllPlaylist, addVideoToPlaylist, removeVideoFromPlaylist, deletePlaylist };
