import { useQuery } from "@tanstack/react-query";
import { getWatchHistory } from "@/api/user.api";
import { useUserStore } from "@/store/userStore";

export const watchHistoryKey = ["watch-history"] as const;

export const useWatchHistory = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: watchHistoryKey,
    queryFn: getWatchHistory,
    enabled: isAuthenticated,
  });
};
