import { useVideos } from "@/hooks/video/useVideos";
import VideoGrid from "@/components/shared/home/VideoGrid";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: videos = [], isPending, error } = useVideos();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="p-4 sm:p-6">
      <VideoGrid videos={videos} isPending={isPending} />
    </div>
  );
}
