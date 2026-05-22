import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscription } from "@/api/subscription.api";
import { channelProfileKey } from "@/hooks/user/useChannelProfile";
import { toast } from "sonner";

export const useToggleSubscribe = (channelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleSubscription(channelId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: channelProfileKey(channelId),
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update subscription");
    },
  });
};
