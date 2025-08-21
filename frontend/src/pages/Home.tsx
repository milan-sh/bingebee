import { useEffect, useState } from "react";
import { getPublicVideos } from "../api/video.ts";
import { requestHandler } from "../utils/index.ts";
import type { Video } from "@/interfaces/video.ts";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api.ts";
import { CirclePlay } from "lucide-react";
import { toast } from "sonner";
import { dateFormatter } from "@/utils/dateFormate.ts";
import { formatDuration } from "@/utils/durationFormat.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Link } from "react-router";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const skeleton = Array.from({ length: 6 }, (_, i) => i);

  useEffect(() => {
    const fetchVideos = async () => {
      await requestHandler(
        async () => await getPublicVideos(),
        setLoading,
        (res: FreeAPISuccessResponseInterface) => {
          setVideosList(res.data);
        },
        (errMsg) => {
          toast.error(errMsg || "Failed to fetch videos");
        }
      );
    };
    fetchVideos();
  }, []);

  // If loading, display a loader
  if (loading)
    return (
      <div className="min-h-screen w-full py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skeleton.map((item) => (
          <div key={item} className="animate-pulse">
            <Skeleton className="h-[175px] w-full rounded-none bg-neutral-900" />
            <div className="flex items-center space-x-4 mt-2">
              <Skeleton className="h-12 w-12 rounded-full bg-neutral-800" />
              <div className="space-y-2 w-[80%]">
                <Skeleton className="h-4 w-[60%] bg-neutral-900" />
                <Skeleton className="h-4 w-[40%] bg-neutral-900" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  // If no videos are available, display a message
  if (!loading && videosList.length === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-y-2 h-screen w-full text-white ">
        <CirclePlay className="text-primary" size={44} />
        <p className="font-semibold md:text-lg">No videos available.</p>
      </div>
    );

  return (
    <div className="bg-black w-full text-white py-10 md:py-8 px-4">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videosList.map((video) => (
          <Link
            to={`/video/${video._id}`}
            key={video._id}
            className="group relative"
          >
            <div key={video._id} className="w-full cursor-pointer group">
              <div className="relative w-full pb-[56.25%] h-0 overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  src={video.thumbnail}
                  alt={video.title}
                />
                <div className="absolute bottom-1.5 right-1.5 flex items-center justify-center bg-black/80 text-white px-2 py-0.5 rounded">
                  <p className="m-0 text-sm leading-5">
                    {formatDuration(video.duration)}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 py-1 mt-1">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={video.owner.avatar}
                  alt={video.owner.fullName}
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg md:text-[16px]">
                    {video.title}
                  </h3>
                  <div className="flex flow-row md:flex-col flex-wrap">
                    <h4 className="font-medium text-gray-400">
                      {video.owner.fullName}
                    </h4>
                    <span className="text-gray-600 md:hidden mx-1">•</span>
                    <div className="flex gap-1 items-center font-medium text-gray-500">
                      <p>{video.views} views</p>
                      <span className="text-gray-600">•</span>
                      <p>{dateFormatter(video.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
