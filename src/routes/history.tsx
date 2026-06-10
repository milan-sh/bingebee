import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { Clock } from "lucide-react";
import Unauth from "@/components/shared/Unauth";
import VideoListCard from "@/components/shared/home/VideoListCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useWatchHistory } from "@/hooks/user/useWatchHistory";
import { useUserStore } from "@/store/userStore";

export const Route = createFileRoute("/history")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const { data: videos = [], isPending, error } = useWatchHistory();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (!isAuthenticated) {
    return (
      <Unauth
        Icon={Clock}
        message="Keep track of what you watch — sign in to see your watch history"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="mb-6 text-xl font-bold sm:text-2xl">Watch History</h1>

      {isPending ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Skeleton className="aspect-video w-full shrink-0 rounded-xl sm:w-48 md:w-64" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center text-muted-foreground">
          <Clock className="size-10 opacity-50" />
          <p className="text-sm">Your watch history is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {videos.map((video) => (
            <VideoListCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
