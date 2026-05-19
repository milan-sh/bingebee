import type { ApiResponse } from "@/types/api.types";
import { apiClient } from "./index.api";

export const uploadVideo = async (
  videoData: FormData,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post("/video/", videoData, {
    timeout: 0,
  });
  return data;
};
