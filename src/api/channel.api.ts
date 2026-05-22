import type { Channel } from "@/schemas/channel.schema";
import { apiClient } from "./index.api";

export const getChannel = async (username: string): Promise<Channel> => {
  const { data } = await apiClient.get(`/users/c/${username}`);
  return data.data;
};
