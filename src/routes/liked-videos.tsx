import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { ThumbsUp } from "lucide-react";
import Unauth from "@/components/shared/Unauth";
import VideoCardSkeleton from "@/components/shared/home/VideoCardSkeleton";
import { useLikedVideos } from "@/hooks/like/useLikedVideos";
import { formatDuration } from "@/lib/dtformatter";
import { useUserStore } from "@/store/userStore";

export const Route = createFileRoute("/liked-videos")({
  component: RouteComponent,
});

const gridClass =
  "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3";

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { data: videos = [], isPending, error } = useLikedVideos();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (!isAuthenticated) {
    return (
      <Unauth
        Icon={ThumbsUp}
        message="Enjoy your favorite videos — sign in to see the ones you liked"
      />
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Liked Videos</h1>

      {isPending ? (
        <div className={gridClass}>
          {Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center text-muted-foreground">
          <ThumbsUp className="size-10 opacity-50" />
          <p className="text-sm">You haven't liked any videos yet.</p>
        </div>
      ) : (
        <div className={gridClass}>
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="group flex flex-col gap-3"
            >
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
              <h3 className="line-clamp-2 font-medium leading-snug">
                {video.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
