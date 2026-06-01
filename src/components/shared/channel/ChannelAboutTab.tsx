import { AtSign, Mail, Users } from "lucide-react";
import type { Channel } from "@/schemas/channel.schema";
import { formatSubscribersCount } from "@/lib/subscriptionformatter";

type ChannelAboutTabProps = {
  channel: Channel;
};

const ChannelAboutTab = ({ channel }: ChannelAboutTabProps) => {
  return (
    <div className="max-w-2xl space-y-4">
      <section>
        <h2 className="font-semibold mb-2">Details</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <AtSign className="size-4" />
            <span>@{channel.username}</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="size-4" />
            <span>{channel.email}</span>
          </li>
          <li className="flex items-center gap-2">
            <Users className="size-4" />
            <span>{formatSubscribersCount(channel.subscribersCount)}</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ChannelAboutTab;
