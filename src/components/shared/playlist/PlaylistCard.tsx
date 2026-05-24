import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Playlist } from "@/schemas/playlist.schema";
import { useAddToPlaylist } from "@/hooks/playlist/useAddToPlaylist";
import { useRemoveFromPlaylist } from "@/hooks/playlist/useRemoveFromPlaylist";

type PlaylistCardProps = {
  playlist: Playlist;
  videoId: string;
  ownerId?: string;
};

const PlaylistCard = ({ playlist, videoId, ownerId }: PlaylistCardProps) => {
  const isSaved =
    playlist.videos?.some((video) => video._id === videoId) ?? false;
  const { mutate: add, isPending: adding } = useAddToPlaylist(ownerId);
  const { mutate: remove, isPending: removing } =
    useRemoveFromPlaylist(ownerId);
  const isPending = adding || removing;

  const toggle = () => {
    if (isPending) return;
    if (isSaved) {
      remove({ videoId, playlistId: playlist._id });
    } else {
      add({ videoId, playlistId: playlist._id });
    }
  };

  return (
    <div className="w-full flex items-center justify-between mb-2">
      <div>
        <h3 className="font-semibold">{playlist.name}</h3>
        <p className="text-xs">Private</p>
      </div>
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        className="cursor-pointer disabled:opacity-50"
        aria-label={isSaved ? "Remove from playlist" : "Add to playlist"}
      >
        {isSaved ? (
          <BookmarkCheck className="size-6" />
        ) : (
          <Bookmark className="size-6" />
        )}
      </button>
    </div>
  );
};

export default PlaylistCard;
