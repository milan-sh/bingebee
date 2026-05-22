import { useQuery } from "@tanstack/react-query";
import { getChannel } from "@/api/channel.api";

export const channelProfileKey = (channelId: string) =>
  ["channel-profile", channelId] as const;

export const useChannelProfile = (username: string, channelId: string) => {
  return useQuery({
    queryKey: channelProfileKey(channelId),
    queryFn: () => getChannel(username),
    enabled: !!username && !!channelId,
  });
};
