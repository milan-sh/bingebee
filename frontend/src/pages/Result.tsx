import { useEffect, useState } from "react";
import type { Video } from "@/interfaces/video";
import { Loader } from "@/components";
import { useParams } from "react-router";
import { requestHandler } from "@/utils";
import { searchVideos } from "@/api/video";
import { toast } from "sonner";
import { Link } from "react-router";
import { formatDuration } from "@/utils/durationFormat";
import { dateFormatter } from "@/utils/dateFormate";

const Result = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { query } = useParams();

  useEffect(() => {
    async function getVideos(query: string) {
      await requestHandler(
        async () => await searchVideos(query),
        setLoading,
        (res) => {
          setVideos(res.data);
        },
        (err) => {
          setVideos(null);
        }
      );
    }
    getVideos(query);
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-white w-full mt-4 p-6 flex flex-col items-center gap-4">
        <img
          src="https://media.tenor.com/cUjiXVi5AjUAAAAM/shrek-meme-disgust.gif"
          alt="sad-gif"
          className="h-72 w-fit object-contain mask-b-from-20% mask-b-to-90% rounded-sm"
        />
        <p className="md:text-lg font-semibold text-gray-400 max-w-80 md:max-w-full text-center text-sm">
          No ogres, no onions, no layers of results for your search. Try
          something else?
        </p>
      </div>
    );
  }
  return (
    <div className="w-full text-white p-6 mt-4 flex flex-col gap-3">
      {videos.map((video) => (
        <Link to={`/video/${video._id}`} key={video._id}>
          <div
            key={video._id}
            className="w-full grid grid-cols-1 md:grid-cols-7 md:gap-4 gap-2 border-b border-gray-600"
          >
            <div className="relative md:col-span-3">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full min-h-52 h-52 object-cover rounded-sm"
              />
              <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-sm px-2 py-0.5 rounded">
                {formatDuration(video.duration)}
              </span>
            </div>
            <div className="md:col-span-4 p-2 md:p-0">
              <h4 className="text-[18px] md:text-xl font-semibold">
                {video.title}
              </h4>
              <p className="text-gray-300 text-sm md:mt-6 mt-2">
                {video.views} Views · {dateFormatter(video.createdAt)}
              </p>
              <div className="md:mt-4 mt-2 flex items-center gap-3">
                <img
                  src={video.owner.avatar}
                  alt={video.owner.fullName}
                  className="h-10 w-10 object-cover rounded-full"
                />
                <p className="text-gray-300">{video.owner.fullName}</p>
              </div>
              <p className="text-sm text-gray-400 mt-5 md:block hidden">{video.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Result;
