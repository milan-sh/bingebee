import { useState, useEffect } from "react";
import { Loader } from "@/components";
import { Link } from "react-router";
import { Users } from "lucide-react";
import Button from "@/components/Button";
import type { subscribedChannel } from "@/interfaces/user";
import { requestHandler } from "@/utils";
import { subscribedChannels } from "@/api/subscription";
import { useAuth } from "@/context/AuthCotext";
import { SubscribeButton } from "@/components";
import { formatSubscribersCount } from "@/utils/subscriberFromat";
import { toast } from "sonner";

const Subscriptions = () => {
  const [subscribedToChannels, setSubscribedToChannels] = useState<
    subscribedChannel[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function fetchSubscribedTo() {
    if(!user?._id) return;
    await requestHandler(
      async () => await subscribedChannels(user?._id),
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
    if (user?._id) {
      fetchSubscribedTo();
    }
  }, []);

  if (loading) {
    <div className="min-h-screen">
      <Loader />{" "}
    </div>;
  }

  if (!subscribedToChannels || subscribedToChannels?.length === 0) {
    return (
      <div className="text-white w-full p-6 mt-4">
        <h1 className="md:text-4xl text-xl font-semibold">All subscriptions</h1>
        <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-4 text-white">
          <div className="p-2 bg-accent rounded-full text-primary">
            <Users size={32} />
          </div>
          <h2 className="text-lg">No subscribed channels :(</h2>
          <Link to={"/"}>
            <Button>Start Watching</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white p-4 mt-6">
      <h1 className="md:text-4xl text-xl font-semibold">All subscriptions</h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-2 mt-4">
        {subscribedToChannels?.map((channel) => (
          <div
            key={channel._id}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Link to={`/c/${channel.username}`}>
                <img
                  src={channel?.avatar}
                  alt={channel?.avatar}
                  className="h-16 min-w-16 md:h-24 md:min-w-24 rounded-full"
                />
              </Link>
              <div>
                <h2 className="font-semibold text-lg md:text-3xl">{channel?.fullName}</h2>
                <p className="text-sm md:text-lg text-gray-400">
                    <span>@{channel?.username} • </span>
                  {formatSubscribersCount(channel?.subscribersCount)}
                </p>
              </div>
            </div>
            <SubscribeButton
              channelId={channel?._id}
              status={channel?.isSubscribed}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
