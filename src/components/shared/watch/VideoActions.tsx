import type { Video } from "@/api/video.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VideoActions = ({ video }: { video: Video }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked((prev) => !prev);
    setLiked(false);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: video.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user dismissed the share sheet — nothing to do
    }
  };

  const handleSave = () => {
    setSaved((prev) => !prev);
    toast.success(saved ? "Removed from saved" : "Saved");
  };

  const handleSubscribe = () => {
    setSubscribed((prev) => !prev);
  };

  return (
    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Channel + subscribe */}
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src={video.owner?.avatar} alt={video.owner?.fullName} />
          <AvatarFallback>
            {video.owner?.fullName?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-medium">{video.owner?.fullName}</p>
          <p className="truncate text-sm text-muted-foreground">
            @{video.owner?.username}
          </p>
        </div>
        <Button
          variant={subscribed ? "secondary" : "default"}
          size="lg"
          className="ml-2 rounded-full"
          onClick={handleSubscribe}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Like / dislike pill */}
        <div className="flex items-center rounded-full bg-muted">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-l-full rounded-r-none px-4"
            aria-pressed={liked}
            onClick={handleLike}
          >
            <ThumbsUp
              className={liked ? "fill-current" : undefined}
            />
            Like
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <Button
            variant="ghost"
            size="lg"
            className="rounded-l-none rounded-r-full px-4"
            aria-pressed={disliked}
            onClick={handleDislike}
          >
            <ThumbsDown className={disliked ? "fill-current" : undefined} />
          </Button>
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="rounded-full"
          onClick={handleShare}
        >
          <Share2 />
          Share
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="rounded-full"
          aria-pressed={saved}
          onClick={handleSave}
        >
          <Bookmark className={saved ? "fill-current" : undefined} />
          Save
        </Button>
      </div>
    </div>
  );
};

export default VideoActions;
