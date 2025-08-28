import { apiClient } from "./axios";

function getDashboardStats() {
  return apiClient.get("/dashboard/stats");
}

function getChannelVideos(){
    return apiClient.get("/dashboard/videos");
}

export { getDashboardStats, getChannelVideos };
