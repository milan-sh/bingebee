import { removeFromPlaylist } from "@/api/playlist.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userPlaylistsKey } from "./useUserPlaylists";

export const useRemoveFromPlaylist = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      videoId,
      playlistId,
    }: {
      videoId: string;
      playlistId: string;
    }) => removeFromPlaylist(videoId, playlistId),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: userPlaylistsKey(userId),
        });
      }
      toast.success("Removed from playlist");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove from playlist");
    },
  });
};
