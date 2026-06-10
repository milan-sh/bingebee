import { useQuery } from "@tanstack/react-query";
import { getSubscribedChannels } from "@/api/subscription.api";
import { useUserStore } from "@/store/userStore";

export const subscribedChannelsKey = (subscriberId: string) =>
  ["subscribed-channels", subscriberId] as const;

export const useSubscribedChannels = (subscriberId?: string) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: subscribedChannelsKey(subscriberId ?? ""),
    queryFn: () => getSubscribedChannels(subscriberId as string),
    enabled: !!subscriberId && isAuthenticated,
  });
};
