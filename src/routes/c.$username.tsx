import { Skeleton } from "@/components/ui/skeleton";
import VideoCardSkeleton from "@/components/shared/home/VideoCardSkeleton";
import ChannelBanner from "@/components/shared/channel/ChannelBanner";
import ChannelHeader from "@/components/shared/channel/ChannelHeader";
import ChannelTabs from "@/components/shared/channel/ChannelTabs";
import { useChannelProfile } from "@/hooks/user/useChannelProfile";
import { useUserStore } from "@/store/userStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/c/$username")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = Route.useParams();
  const currentUser = useUserStore((state) => state.user);

  const {
    data: channelProfile,
    isLoading,
    error,
  } = useChannelProfile(username);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load channel profile");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-2 flex flex-col gap-6 p-3 sm:p-4">
        <Skeleton className="h-28 w-full rounded-xl sm:h-48" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="size-20 shrink-0 rounded-full sm:size-32" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-9 w-32 rounded-full sm:self-center" />
        </div>

        <div className="flex gap-6 border-b pb-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!channelProfile) return null;

  const isOwner = currentUser?._id === channelProfile._id;

  return (
    <div className="max-w-5xl mx-auto py-2 p-3 sm:p-4">
      <ChannelBanner
        coverImage={channelProfile.coverImage}
        isOwner={isOwner}
      />
      <ChannelHeader channel={channelProfile} isOwner={isOwner} />
      <ChannelTabs channel={channelProfile} />
    </div>
  );
}
