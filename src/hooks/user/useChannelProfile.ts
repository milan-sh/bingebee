import { useQuery } from "@tanstack/react-query";
import { getChannel } from "@/api/channel.api";

export const channelProfileKey = (username: string) =>
  ["channel-profile", username] as const;

export const useChannelProfile = (username: string) => {
  return useQuery({
    queryKey: channelProfileKey(username),
    queryFn: () => getChannel(username),
    enabled: !!username,
  });
};
