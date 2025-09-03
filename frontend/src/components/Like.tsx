import { toggleVideoLike, videoAlreadyLiked } from "@/api/like";
import { requestHandler } from "@/utils";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Like = ({ videoId }: { videoId: string }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    await requestHandler(
      async () => await toggleVideoLike(videoId),
      setLoading,
      () => {
        if(disliked) setDisliked(false);
        setLiked((prev) => !prev);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  };

  const checkIfVideoLiked = async () => {
    await requestHandler(
      async () => await videoAlreadyLiked(videoId),
      setLoading,
      (res) => {
        setLiked(res.data.isLiked);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  };

  useEffect(() => {
    checkIfVideoLiked();
  }, [videoId]);

  return (
    <div className="border rounded-lg flex gap-[1px] bg-neutral-600">
      <button
        onClick={handleLike}
        disabled={loading}
        className="px-4 py-1.5 flex items-center gap-2 bg-black rounded-lg hover:bg-neutral-900 cursor-pointer"
      >
        <ThumbsUp size={20} fill={liked ? "white" : "transparent"} />
      </button>
    </div>
  );
};

export default Like;
