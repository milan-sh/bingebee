import { useQuery } from "@tanstack/react-query";
import { userPlaylists } from "@/api/playlist.api";
import { useUserStore } from "@/store/userStore";

export const userPlaylistsKey = (userId: string) =>
  ["user-playlists", userId] as const;

export const useUserPlaylists = (userId?: string) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: userPlaylistsKey(userId ?? ""),
    queryFn: () => userPlaylists(userId as string),
    enabled: !!userId && isAuthenticated,
  });
};
