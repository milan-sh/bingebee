import { apiClient } from "./index.api";
import { type ApiResponse } from "@/types/api.types";

export type SubscribedChannel = {
  _id: string;
  username: string;
  fullName: string;
  avatar?: string;
  subscribersCount?: number;
};

export const toggleSubscription = async (
  channelId: string,
): Promise<ApiResponse> => {
  const { data } = await apiClient.post(`/subscriptions/c/${channelId}`);
  return data;
};

export const getSubscribedChannels = async (
  subscriberId: string,
): Promise<SubscribedChannel[]> => {
  const { data } = await apiClient.get(`/subscriptions/u/${subscriberId}`);
  // Normalize across backend shapes: a list of channels directly, or a list
  // of subscription docs with the channel nested under subscribedChannel/channel.
  const list: unknown[] = data.data ?? [];
  return list.map((item) => {
    const entry = item as Record<string, SubscribedChannel>;
    return entry.subscribedChannel ?? entry.channel ?? (item as SubscribedChannel);
  });
};
