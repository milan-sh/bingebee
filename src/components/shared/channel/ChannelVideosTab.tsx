import { Video as VideoIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import VideoCard from "@/components/shared/home/VideoCard";
import VideoCardSkeleton from "@/components/shared/home/VideoCardSkeleton";
import { useGetVideosByChannel } from "@/hooks/video/useGetVideosByChannel";

type ChannelVideosTabProps = {
  channelId: string;
};

const ChannelVideosTab = ({ channelId }: ChannelVideosTabProps) => {
  const { data: videos, isLoading, error } = useGetVideosByChannel(channelId);

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load videos");
  }, [error]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
        <VideoIcon className="size-8 opacity-50" />
        <p className="text-sm">This channel hasn't uploaded any videos yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default ChannelVideosTab;
