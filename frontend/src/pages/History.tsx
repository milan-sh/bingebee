import { requestHandler } from "@/utils";
import { getUserWatchHistory } from "@/api/history";
import { useEffect, useState } from "react";
import type { Video } from "@/interfaces/video";
import { toast } from "sonner";
import { Button, Loader } from "@/components";
import { ClockAlert } from "lucide-react";
import { Link } from "react-router";

const History = () => {
  const [watchHistory, setWatchHistory] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      async function fetchHistory() {
          await requestHandler(
              async()=> getUserWatchHistory(),
              setLoading,
              (res)=> {
                  if(res.data.length>0){
                      toast.success("Watch History fetched successfully")
                      setWatchHistory(res.data)
                  }
              },
              (err)=> toast.error(err || "something went wrong")
          )
      }

      fetchHistory();
  }, [])

  if (loading) {
    <div>
      <Loader />{" "}
    </div>;
  }

  if (!watchHistory || watchHistory?.length === 0) {
    return (
      <div className="text-white w-full p-4">
        <h1 className="md:text-4xl text-lg font-semibold">Watch history</h1>
        <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-4 text-white">
            <div className="p-2 bg-accent rounded-full text-primary"><ClockAlert size={32} /></div>
          <h2 className="text-lg">Looks like you haven't watched anything :(</h2>
          <Link to={"/"}><Button>Start Watching</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white p-4 mt-6">
      <h1 className="md:text-4xl text-xl font-semibold">Watch history</h1>
      <hr className="my-4"/>
      <div className="flex flex-col gap-2 mt-4">
        {watchHistory.map((video)=>(
            <div key={video._id} className="grid md:grid-cols-3 grid-cols-2 gap-4">
                <img src={video.thumbnail} alt={video.title} className="md:h-60 h-36 w-full object-cover rounded-lg"/>
                <div className="flex flex-col">
                    <div>
                        <h2 className="md:text-xl font-semibold leading-5 mb-1">{video.title}</h2>
                        <p className="text-gray-400 text-sm">{video.owner.fullName} • {video.views} views</p>
                    </div>
                    <p className="md:text-sm text-xs text-gray-400 mt-3">{video.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default History;
