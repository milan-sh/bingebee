import { createPlaylist } from "@/api/playlist.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userPlaylistsKey } from "./useUserPlaylists";
import type { CreatePlaylistData } from "@/schemas/playlist.schema";

export const useAddPlaylist = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, description }: CreatePlaylistData) =>
      createPlaylist(name, description),
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: userPlaylistsKey(userId),
        });
      }
      toast.success("Playlist created");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create playlist");
    },
  });
};
