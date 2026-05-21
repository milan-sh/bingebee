import { useQuery } from "@tanstack/react-query";
import { getChannelStats } from "@/api/dashboard.api";

export const dashboardStatsKey = {
  all: ["channel-stats"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardStatsKey.all,
    queryFn: getChannelStats,
  });
}
