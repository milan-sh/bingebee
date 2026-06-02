import type { Video } from "@/api/video.api";
import {
  formatDuration,
  formatRelativeTime,
  formatViews,
} from "@/lib/dtformatter";
import { Link } from "@tanstack/react-router";

const ChannelVideoCard = ({ video }: { video: Video }) => {
  return (
    <Link to={`/watch/${video._id}`} className="group flex flex-col gap-3">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-200 group-hover:scale-105 sm:rounded-xl group-hover:sm:rounded-none"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Meta */}
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-medium leading-snug">
            {video.title}
          </h3>
          <p className="mt-1 truncate text-sm text-muted-foreground transition-colors hover:text-foreground">
            {video.owner?.fullName}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatViews(video.views)} · {formatRelativeTime(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChannelVideoCard;
