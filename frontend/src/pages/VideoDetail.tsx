import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils/index";
import { Link, useParams } from "react-router";
import { addVideoView, getVideoById } from "@/api/video";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { dateFormatter } from "@/utils/dateFormate";
import { Frown } from "lucide-react";
import {
  Like,
  Loader,
  SaveToPlaylistButton,
  SubscribeButton,
  VideosListView,
  CommentSection,
  Share,
} from "@/components/index";
import { formatSubscribersCount } from "@/utils/subscriberFromat";
import type { ChannelProfile } from "@/interfaces/user";
import { getChannelProfile } from "@/api/profile";
import { addVideoToWatchHistory } from "@/api/history";

const VideoDetail = () => {
  const { open, toggleSidebar } = useSidebar();
  const [video, setVideo] = useState<Video | null>(null);
  const [channelProfile, setChannelProfile] = useState<ChannelProfile | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { videoId } = useParams();

  // fetch video by id
  async function fetchVideo(id: string) {
    await requestHandler(
      async () => await getVideoById(id),
      setLoading,
      (res) => {
        setVideo(res.data);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  //fetch channel profile
  async function fetchChannelProfile() {
    if (!video?.owner?.username) return;
    await requestHandler(
      async () => await getChannelProfile(video?.owner?.username),
      setLoading,
      (res) => {
        setChannelProfile(res.data);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  async function updateVideoViews() {
    if (!videoId) return;
    await requestHandler(
      async () => await addVideoView(videoId),
      setLoading,
      () => {},
      (err) => toast.error(err || "something went wrong")
    );
  }

  async function addingVideoToWatchHistory(videoId: string) {
    await requestHandler(
      async () => await addVideoToWatchHistory(videoId),
      setLoading,
      () => {},
      (err) => toast.error(err || "something went wrong.")
    );
  }

  useEffect(() => {
    if (!videoId) return;
    (async () => {
      await fetchVideo(videoId);
      await Promise.all([
        updateVideoViews(),
        addingVideoToWatchHistory(videoId),
      ]);
    })();
  }, [videoId]);

  // Separate useEffect for channel profile
  useEffect(() => {
    if (video?.owner?.username) {
      fetchChannelProfile();
    }
  }, [video?.owner?.username]); // Runs when owner username changes

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
        <div className="relative w-full pb-[56.25%]">
          {" "}
          {/* 16:9 ratio */}
          <ReactPlayer
            src={video?.videoFile}
            controls
            playing
            volume={0.5}
            width="100%"
            height="100%"
            className="absolute top-0 left-0"
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
            {/* like, share, save to playlist buttons */}
            <div className="flex items-center justify-between gap-4">
              {videoId && <Like videoId={videoId} />}
              <Share />
              {videoId && <SaveToPlaylistButton videoId={videoId} />}
            </div>
          </div>
          {/* avatar and subscribe button */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/c/${video.owner.username}`}>
                <img
                  src={video?.owner.avatar}
                  alt={video?.owner.fullName}
                  className="w-10 h-10 rounded-full"
                />
              </Link>
              <div>
                <Link to={`/c/${video.owner.username}`}>
                  <h3 className="md:text-lg font-semibold">
                    {video?.owner.fullName}
                  </h3>
                </Link>
                <p className="text-sm text-gray-400">
                  {formatSubscribersCount(channelProfile?.subscribersCount)}
                </p>
              </div>
            </div>
            {channelProfile && video?.owner?._id && (
              <SubscribeButton
                channelId={video?.owner._id}
                status={channelProfile?.isSubscribed}
              />
            )}
          </div>
          <div className="mt-6 border-t py-2">
            <p className="text-sm text-gray-300">{video?.description}</p>
          </div>
        </div>
        {/* comments */}
        <div className="mt-3 border rounded-lg p-4">
          {videoId && <CommentSection videoId={videoId} />}
        </div>
      </div>
      {/* SidebarFeed */}
      <VideosListView />
    </div>
  );
};

export default VideoDetail;
