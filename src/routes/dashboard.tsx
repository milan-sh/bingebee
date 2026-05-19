import DashboardStats from "@/components/shared/dashboard/DashboardStats";
import Unauth from "@/components/shared/Unauth";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserStore } from "@/store/userStore";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Heart, LayoutDashboard, Plus, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import VideoUpload from "@/components/shared/dashboard/VideoUpload";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const { state, setOpen } = useSidebar();

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
          <VideoUpload />
        </Dialog>
      </div>

      {/* stats */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStats Icon={Eye} title="Total Views" count="1,200" />
        <DashboardStats
          Icon={UserRound}
          title="Total Subscribers"
          count="200"
        />
        <DashboardStats Icon={Heart} title="Total Likes" count="200" />
      </div>
    </div>
  );
}
