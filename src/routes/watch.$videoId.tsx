import { createFileRoute } from "@tanstack/react-router";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import { toast } from "sonner";
import { useVideo } from "@/hooks/video/useVideo";
import { useVideos } from "@/hooks/video/useVideos";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRelativeTime, formatViews } from "@/lib/dtformatter";
import RelatedVideoItem from "@/components/shared/watch/RelatedVideoItem";
import VideoActions from "@/components/shared/watch/VideoActions";
import CommentsSection from "@/components/shared/comment/CommentsSection";
import { useSidebar } from "@/components/ui/sidebar";

export const Route = createFileRoute("/watch/$videoId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { videoId } = Route.useParams();
  const { data: video, isPending, error } = useVideo(videoId);
  const { data: allVideos = [] } = useVideos();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const related = allVideos.filter((v) => v._id !== videoId);

  const { state, setOpen } = useSidebar();
  useEffect(() => {
    if (state === "expanded") setOpen(false);
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] p-4 lg:flex lg:gap-6 lg:p-6">
      {/* Main column */}
      <div className="min-w-0 flex-1">
        {/* Player */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {isPending ? (
            <Skeleton className="size-full rounded-xl" />
          ) : video ? (
            <ReactPlayer
              src={video.videoFile}
              controls
              playing
              width="100%"
              height="100%"
              poster={video.thumbnail}
            />
          ) : null}
        </div>

        {/* Details */}
        {isPending ? (
          <WatchInfoSkeleton />
        ) : video ? (
          <div className="mt-4">
            <h1 className="text-lg font-semibold leading-snug sm:text-xl">
              {video.title}
            </h1>

            <VideoActions video={video} />

            <div className="mt-4 rounded-xl bg-muted/50 p-3 text-sm">
              <p className="font-medium">
                {formatViews(video.views)} ·{" "}
                {formatRelativeTime(video.createdAt)}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-muted-foreground">
                {video.description}
              </p>
            </div>

            <CommentsSection videoId={video._id} />
          </div>
        ) : null}
      </div>

      {/* Related sidebar */}
      <aside className="mt-8 w-full shrink-0 space-y-3 lg:mt-0 lg:w-[400px]">
        {isPending
          ? Array.from({ length: 8 }).map((_, i) => (
              <RelatedItemSkeleton key={i} />
            ))
          : related.map((v) => <RelatedVideoItem key={v._id} video={v} />)}
      </aside>
    </div>
  );
}

const WatchInfoSkeleton = () => (
  <div className="mt-4 space-y-3">
    <Skeleton className="h-6 w-3/4" />
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-24 w-full rounded-xl" />
  </div>
);

const RelatedItemSkeleton = () => (
  <div className="flex gap-2">
    <Skeleton className="aspect-video w-40 shrink-0 rounded-lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);
