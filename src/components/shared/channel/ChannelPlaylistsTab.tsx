import { ListVideo } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserPlaylists } from "@/hooks/playlist/useUserPlaylists";

type ChannelPlaylistsTabProps = {
  channelId: string;
};

const ChannelPlaylistsTab = ({ channelId }: ChannelPlaylistsTabProps) => {
  const { data: playlists, isLoading, error } = useUserPlaylists(channelId);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load playlists");
  }, [error]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!playlists || playlists.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
        <ListVideo className="size-8 opacity-50" />
        <p className="text-sm">No playlists yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          className="rounded-lg border bg-card p-4 flex flex-col gap-1"
        >
          <h3 className="font-semibold truncate">{playlist.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {playlist.description}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {playlist.videos.length}{" "}
            {playlist.videos.length === 1 ? "video" : "videos"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChannelPlaylistsTab;
