import DashboardStats from "@/components/shared/dashboard/DashboardStats";
import Unauth from "@/components/shared/Unauth";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserStore } from "@/store/userStore";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Heart, LayoutDashboard, Plus, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import ChannelVideos from "@/components/shared/dashboard/ChannelVideos";
import VideoForm from "@/components/shared/dashboard/VideoForm";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const { state, setOpen } = useSidebar();

  const { data: channelStats, isPending, error } = useDashboardStats();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (state === "expanded") {
      setOpen(false);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <Unauth
        Icon={LayoutDashboard}
        message="Login to upload and publish your videos"
      />
    );
  }
  if (isPending) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        <Skeleton className="h-[30vh] rounded-lg" />
        <Skeleton className="h-[30vh] rounded-lg" />
        <Skeleton className="h-[30vh] rounded-lg" />
      </div>
    );
  }
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <div>
          <h1 className="font-bold text-lg sm:text-2xl">
            Welcome Back, {user?.fullName}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-1 px-4 py-5 font-semibold">
              <Plus />
              Upload Video
            </Button>
          </DialogTrigger>
          <VideoForm mode="create" />
        </Dialog>
      </div>

      {/* stats */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStats
          Icon={Eye}
          title="Total Views"
          count={channelStats?.toatalViews ?? 0}
        />
        <DashboardStats
          Icon={UserRound}
          title="Total Subscribers"
          count={channelStats?.totalSubscribers ?? 0}
        />
        <DashboardStats
          Icon={Heart}
          title="Total Video Likes"
          count={channelStats?.totalVideoLikes ?? 0}
        />
      </div>
      <ChannelVideos />
    </div>
  );
}
