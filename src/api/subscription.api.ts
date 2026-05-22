import { apiClient } from "./index.api";
import { type ApiResponse } from "@/types/api.types";

export const toggleSubscription = async (
  channelId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post(`/subscriptions/c/${channelId}`);
  return data;
};
