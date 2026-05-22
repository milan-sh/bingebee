import type { Video } from "@/api/video.api";
import { useChannelProfile } from "@/hooks/user/useChannelProfile";
import { useEffect } from "react";
import { toast } from "sonner";
import ChannelBar from "./ChannelBar";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

const VideoActions = ({ video }: { video: Video }) => {
  const { data: channelProfile, error } = useChannelProfile(
    video.owner.username,
    video.owner._id,
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Channel + subscribe */}
      <ChannelBar owner={video.owner} channel={channelProfile} />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <LikeButton />
        <ShareButton title={video.title} />
        <SaveButton />
      </div>
    </div>
  );
};

export default VideoActions;
