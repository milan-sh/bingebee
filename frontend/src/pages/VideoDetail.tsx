import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils/index";
import { useParams } from "react-router";
import { getVideoById } from "@/api/video";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { dateFormatter } from "@/utils/dateFormate";
import { Frown } from "lucide-react";
import { LikeDislike, Loader, SaveToPlaylistButton, SubscribeButton, VideosListView } from "@/components/index";

const VideoDetail = () => {
  const { open, toggleSidebar } = useSidebar();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const { videoId } = useParams();


  // fetch video by id
  async function fetchVideo(id: string) {
    await requestHandler(
      async () => await getVideoById(id),
      setLoading,
      (res: FreeAPISuccessResponseInterface) => {
        setVideo(res.data);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  useEffect(() => {
    if (open) {
      toggleSidebar();
    }
    if (videoId) {
      // TODO: fix this item's creating problem being called twice because of sidebar
      fetchVideo(videoId);
    }
  }, [videoId]);

  if(loading) return <Loader />;
  if(!video) return <div className="min-h-screen w-full flex flex-col justify-center items-center text-white">
    <Frown size={36} className="text-primary"/>
    <span className="text-lg font-semibold">Video not found</span></div>;

  return (
    <div className="min-h-screen w-full py-8 px-4 text-white grid md:grid-cols-6 gap-2">
      <div className="w-full md:col-span-4">
        {/* video frame for desktop */}
        <div className="hidden md:block">
          <ReactPlayer
            src={video?.videoFile}
            controls={true}
            volume={0.5}
            width="100%"
            height="60%"
            pip={true}
            autoPlay
          />
        </div>
        {/* video frame for mobile */}
        <div className="block md:hidden mt-2">
          <ReactPlayer
            src={video?.videoFile}
            controls={true}
            volume={0.5}
            width="100%"
            height="100%"
            pip={true}
            autoPlay
          />
        </div>
        {/* channel operations */}
        <div className="mt-3 border rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* video details */}
            <div>
              <h2 className="text-lg font-bold">{video?.title}</h2>
              <p className="text-sm">
                {video?.views} views · {dateFormatter(video?.createdAt)}
              </p>
            </div>
            {/* like, dislike, save to playlist buttons */}
            <div className="flex items-center justify-between gap-4">
              <LikeDislike />
              <SaveToPlaylistButton />
            </div>
          </div>
          {/* avatar and subscribe button */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={video?.owner.avatar} alt={video?.owner.fullName} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{video?.owner.fullName}</h3>
                <p className="text-sm text-gray-400">757K Subscribers</p>
              </div>
            </div>
            <SubscribeButton />
          </div>
        </div>
      </div>
      {/* SidebarFeed */}
      <VideosListView />
    </div>
  );
};

export default VideoDetail;
