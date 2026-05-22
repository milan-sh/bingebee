import type { Video } from "@/api/video.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatSubscribersCount } from "@/lib/subscriptionformatter";
import type { Channel } from "@/schemas/channel.schema";
import SubscribeButton from "./SubscribeButton";

type ChannelBarProps = {
  owner: Video["owner"];
  channel?: Channel;
};

const ChannelBar = ({ owner, channel }: ChannelBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarImage src={owner?.avatar} alt={owner?.fullName} />
        <AvatarFallback>
          {owner?.fullName?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-medium">{owner?.fullName}</p>
        <p className="truncate text-sm text-muted-foreground">
          {formatSubscribersCount(channel?.subscribersCount ?? 0)}
        </p>
      </div>
      <SubscribeButton
        channelId={owner._id}
        isSubscribed={channel?.isSubscribed ?? false}
      />
    </div>
  );
};

export default ChannelBar;
