import { useEffect, useState } from "react";
import { TabsContent } from "../ui/tabs";
import type { subscribedChannel } from "@/interfaces/user";
import { requestHandler } from "@/utils";
import { subscribedChannels } from "@/api/subscription";
import { toast } from "sonner";
import LoadingSvg from "../LoadingSvg";
import { Users } from "lucide-react";
import SubscribeButton from "../SubscribeButton";
import { formatSubscribersCount } from "@/utils/subscriberFromat";
import { Link } from "react-router";

const SubscribedTab = ({ channelId }: { channelId: string }) => {
  const [subscribedToChannels, setSubscribedToChannels] = useState<
    subscribedChannel[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  async function fetchSubscribedTo() {
    await requestHandler(
      async () => await subscribedChannels(channelId),
      setLoading,
      (res) => {
        if (res.data.length > 0) {
          setSubscribedToChannels(res.data);
        }
      },
      (err) => toast.error(err || "something went wrong.")
    );
  }
  useEffect(() => {
    if (channelId) {
      fetchSubscribedTo();
    }
  }, [channelId]);

  if (loading) {
    return (
      <TabsContent value="subscribed">
        <LoadingSvg />
      </TabsContent>
    );
  }
  if (!subscribedToChannels || subscribedToChannels.length === 0) {
    return (
      <TabsContent
        value="subscribed"
        className="flex flex-col items-center justify-center gap-2 py-4"
      >
        <div className="flex items-center justify-center bg-primary p-2 rounded-full">
          <Users />
        </div>
        <h2 className="font-semibold text-gray-200">No people subscribers</h2>
        <p className="text-gray-200 max-w-96 text-center">
          This channel has yet to subscribe a new channel.
        </p>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="subscribed" className="flex flex-col gap-2">
      {subscribedToChannels?.map((channel) => (
        <div
          key={channel._id}
          className="w-full flex items-center justify-between"
        >
          <div className="flex gap-2">
            <Link to={`/c/${channel.username}`}>
              <img
              src={channel?.avatar}
              alt={channel?.avatar}
              className="h-14 min-w-14 rounded-full"
            />
            </Link>
            <div>
              <h2 className="font-semibold text-lg">
                {channel?.fullName}
              </h2>
              <p className="text-[14px] text-gray-400">
                {formatSubscribersCount(channel?.subscribersCount)}
              </p>
            </div>
          </div>
          <SubscribeButton channelId={channel?._id} status={channel?.isSubscribed}/>
        </div>
      ))}
    </TabsContent>
  );
};

export default SubscribedTab;
