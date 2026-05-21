import type { Video } from "@/api/video.api";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";
import { Video as VideoIcon } from "lucide-react";

type VideoGridProps = {
  videos: Video[];
  isPending: boolean;
};

const gridClass =
  "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3";

const VideoGrid = ({ videos, isPending }: VideoGridProps) => {
  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center text-muted-foreground">
        <VideoIcon className="size-10 opacity-50" />
        <p className="text-sm">No videos to show yet.</p>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
