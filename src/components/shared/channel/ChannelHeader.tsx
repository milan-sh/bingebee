import type { Channel } from "@/schemas/channel.schema";
import { formatSubscribersCount } from "@/lib/subscriptionformatter";
import SubscribeButton from "../watch/SubscribeButton";
import ChannelAvatar from "./ChannelAvatar";

type ChannelHeaderProps = {
  channel: Channel;
  isOwner: boolean;
};

const ChannelHeader = ({ channel, isOwner }: ChannelHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center">
      <ChannelAvatar
        avatar={channel.avatar}
        fullName={channel.fullName}
        isOwner={isOwner}
      />
      <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
        <h1 className="font-bold text-xl truncate">{channel.fullName}</h1>
        <p className="text-muted-foreground text-sm">@{channel.username}</p>
        <p className="text-muted-foreground text-sm">
          {formatSubscribersCount(channel.subscribersCount)} ·{" "}
          {channel.channelsSubscribedToCount} Subscribed
        </p>
      </div>
      {!isOwner && (
        <SubscribeButton
          channelId={channel._id}
          isSubscribed={channel.isSubscribed}
        />
      )}
    </div>
  );
};

export default ChannelHeader;
