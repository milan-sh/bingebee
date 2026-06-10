import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Video } from "@/api/video.api";
import {
  formatDuration,
  formatRelativeTime,
  formatViews,
} from "@/lib/dtformatter";
import { Link } from "@tanstack/react-router";

const VideoListCard = ({ video }: { video: Video }) => {
  return (
    <Link
      to={`/watch/${video._id}`}
      className="group flex flex-col gap-3 sm:flex-row sm:gap-4"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-48 md:w-64">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Meta */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-medium leading-snug sm:text-lg">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatViews(video.views)} · {formatRelativeTime(video.createdAt)}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={video.owner?.avatar} alt={video.owner?.fullName} />
            <AvatarFallback>
              {video.owner?.fullName?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm text-muted-foreground transition-colors group-hover:text-foreground">
            {video.owner?.fullName}
          </span>
        </div>

        {video.description && (
          <p className="mt-2 line-clamp-2 hidden text-sm text-muted-foreground sm:block">
            {video.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default VideoListCard;
