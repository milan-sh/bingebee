import { useSidebar } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils/index";
import { useParams } from "react-router";
import { getVideoById } from "@/api/video";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import ReactPlayer from "react-player";

const VideoDetail = () => {
  const { open, toggleSidebar } = useSidebar();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const { videoId } = useParams();

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
  }, []);

  return (
    <div className="min-h-screen w-full py-8 px-4 text-white grid md:grid-cols-6">
      <div className="w-full md:col-span-4">
        <div className="hidden md:">
          <ReactPlayer
            src={video?.videoFile}
            controls={true}
            volume={0.5}
            width="90%"
            height="70%"
            pip={true}
            autoPlay
          />
        </div>
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
      </div>
    </div>
  );
};

export default VideoDetail;
