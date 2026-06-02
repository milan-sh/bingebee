import { ListVideo } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserPlaylists } from "@/hooks/playlist/useUserPlaylists";
import type { Playlist } from "@/schemas/playlist.schema";

type ChannelPlaylistsTabProps = {
  channelId: string;
};

const PlaylistTabCard = ({ playlist }: { playlist: Playlist }) => {
  const videoCount = playlist.videos.length;
  const firstVideo = playlist.videos[0];

  return (
    <Link
      to={firstVideo ? `/watch/${firstVideo._id}` : "."}
      className="group flex flex-col gap-3"
    >
      {/* Thumbnail with stacked effect */}
      <div className="relative">
        {/* Stack layers behind */}
        <div className="absolute inset-x-2 -top-1.5 h-full rounded-xl bg-muted-foreground/30" />
        <div className="absolute inset-x-1 -top-0.5 h-full rounded-xl bg-muted-foreground/50" />

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
          {firstVideo ? (
            <img
              src={firstVideo.thumbnail}
              alt={playlist.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <ListVideo className="size-8 text-muted-foreground" />
            </div>
          )}

          {/* Count overlay */}
          <div className="absolute bottom-0 right-0 flex h-full w-[40%] flex-col items-center justify-center gap-1 bg-black/70 text-white">
            <ListVideo className="size-5" />
            <span className="text-sm font-medium tabular-nums">
              {videoCount}
            </span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="min-w-0">
        <h3 className="line-clamp-2 font-medium leading-snug">
          {playlist.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {playlist.description}
        </p>
        <p className="mt-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          View full playlist
        </p>
      </div>
    </Link>
  );
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
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
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
        <PlaylistTabCard key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

export default ChannelPlaylistsTab;
