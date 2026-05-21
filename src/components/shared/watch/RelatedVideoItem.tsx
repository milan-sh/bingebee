import type { Video } from "@/api/video.api";
import {
  formatDuration,
  formatRelativeTime,
  formatViews,
} from "@/lib/dtformatter";
import { Link } from "@tanstack/react-router";

const RelatedVideoItem = ({ video }: { video: Video }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="group flex gap-2"
    >
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="size-full object-cover"
        />
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[11px] font-medium text-white tabular-nums">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {video.title}
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {video.owner?.fullName}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatViews(video.views)} · {formatRelativeTime(video.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default RelatedVideoItem;
