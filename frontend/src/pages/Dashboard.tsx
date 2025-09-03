import { Eye, Heart, Plus, User } from "lucide-react";
import { Loader, VideoUploadDialog, VideosTable } from "../components/index.ts";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils/index.ts";
import { getDashboardStats } from "@/api/dashboard.ts";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { toast } from "sonner";

const Dashboard = () => {
  const [stats, setStats] = useState({ views: 0, subscribers: 0, likes: 0 });
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      await requestHandler(
        async () => await getDashboardStats(),
        setStatsLoading,
        (res) => {
          setStats({
            views: res.data.toatalViews | 0,
            subscribers: res.data.totalSubscribers | 0,
            likes: res.data.totalVideoLikes | 0,
          });
        },
        (error) => {
          toast.error(error || "something went wrong");
        }
      );
    }

    fetchStats();
  }, []);

  if (statsLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="relative text-white w-full h-screen my-10 md:my-4 px-4">
      <div className="flex items-center justify-between md:mb-4 mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="md:text-3xl text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm">
            Here you can manage your account, view your activity, and more.
          </p>
        </div>
        {/* video upload modal */}
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center gap-x-1 bg-primary text-black hover:bg-accent py-2 px-4 cursor-pointer font-semibold text-shadow-lg">
              <Plus />
              <span>Upload video</span>
            </div>
          </DialogTrigger>
          <VideoUploadDialog />
        </Dialog>
      </div>
      {/* channel stats */}
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <Eye />
          </div>
          <div>
            <p>Total Views</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {stats.views}
            </h2>
          </div>
        </div>
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <User />
          </div>
          <div>
            <p>Total Subscribers</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {stats.subscribers}
            </h2>
          </div>
        </div>
        <div className="border p-3 flex flex-col justify-between">
          <div className="bg-primary w-fit p-1 rounded-full mb-6">
            <Heart />
          </div>
          <div>
            <p>Total Video Likes</p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              {stats.likes}
            </h2>
          </div>
        </div>
      </div>
      {/* videos table */}
      <VideosTable />
    </div>
  );
};

export default Dashboard;
