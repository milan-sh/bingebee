import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils/index";
import { useParams } from "react-router";
import { getVideoById } from "@/api/video";
import { channelSubscribers } from "@/api/subscription";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { dateFormatter } from "@/utils/dateFormate";
import { Frown } from "lucide-react";
import {
  LikeDislike,
  Loader,
  SaveToPlaylistButton,
  SubscribeButton,
  VideosListView,
} from "@/components/index";
import { formatSubscribersCount } from "@/utils/subscriberFromat";

const VideoDetail = () => {
  const { open, toggleSidebar } = useSidebar();
  const [video, setVideo] = useState<Video | null>(null);
  const [subscribers, setSubscribers] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { videoId } = useParams();

  // fetch video by id
  async function fetchVideo(id: string) {
    await requestHandler(
      async () => await getVideoById(id),
      setLoading,
      (res: FreeAPISuccessResponseInterface) => {
        setVideo(res.data);
        if (res.data.owner._id) {
          fetchChannelSubscribers(res.data.owner._id);
        }
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  //fetch channel subscribers
  async function fetchChannelSubscribers(channelId: string) {
    await requestHandler(
      async () => await channelSubscribers(channelId),
      setLoading,
      (res: FreeAPISuccessResponseInterface) => {
        setSubscribers(res.data.length);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  useEffect(() => {
    if (videoId) {
      fetchVideo(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (open) {
      toggleSidebar();
    }
  }, []);

  if (loading) return <Loader />;
  if (!video)
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center text-white">
        <Frown size={36} className="text-primary" />
        <span className="text-lg font-semibold">Video not found</span>
      </div>
    );

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
              <LikeDislike videoId={videoId} />
              <SaveToPlaylistButton videoId={videoId} />
            </div>
          </div>
          {/* avatar and subscribe button */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={video?.owner.avatar}
                alt={video?.owner.fullName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {video?.owner.fullName}
                </h3>
                <p className="text-sm text-gray-400">{formatSubscribersCount(subscribers)}</p>
              </div>
            </div>
            <SubscribeButton channelId={video?.owner._id} />
          </div>
        </div>
      </div>
      {/* SidebarFeed */}
      <VideosListView />
    </div>
  );
};

export default VideoDetail;
