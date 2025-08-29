import { useAuth } from "@/context/AuthCotext";
import { useEffect, useState } from "react";
import { requestHandler } from "@/utils";
import { channelSubscribers, subscribedChannels } from "@/api/subscription";
import type { FreeAPISuccessResponseInterface } from "@/interfaces/api";
import type {UserInterface} from "@/interfaces/user"
import { formatSubscribersCount, formatSubscribedChannelsCount } from "@/utils/subscriberFromat";
import { toast } from "sonner";
import { useParams } from "react-router";
import { Button, Loader, SubscribeButton } from "@/components";
import { UserRoundPlus } from "lucide-react";

const Channel = () => {
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState<number>(0);
  const [subscribedTo, setSubscribedTo] = useState<UserInterface[] | null>(null);
  const [loading, setLoading] = useState(false);

  const {channelId} = useParams();

  //fetch channel subscribers
  async function fetchChannelSubscribers(channelId: string) {
    await requestHandler(
      async () => await channelSubscribers(channelId),
      setLoading,
      (res: FreeAPISuccessResponseInterface) => {
        setSubscribers(res.data.length);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  //fetch subscribed channels
  async function fetchSubscribedChannels(channelId: string) {
    await requestHandler(
      async () => await subscribedChannels(channelId),
      setLoading,
      (res: FreeAPISuccessResponseInterface) => {
        setSubscribedTo(res.data);
      },
      (errMssg) => {
        toast.error(errMssg || "Something went wrong");
      }
    );
  }

  useEffect(()=>{
    if(channelId){
        fetchChannelSubscribers(channelId)
        fetchSubscribedChannels(channelId)
    }
  }, [])

  if(loading) return <div className="min-h-screen w-full flex items-center justify-center"><Loader/></div>

  return (
    <div className="min-h-screen w-full text-white">
        {/* profile section */}
      <div className="min-h-50 w-full border">
        {user?.coverImage && (
          <img src={user.coverImage} className="w-full h-50 object-cover" />
        )}
      </div>
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-4 items-center">
          <img
            src={user?.avatar}
            alt={user?.fullName}
            className="h-28 min-w-28 -translate-y-7 rounded-full object-cover border-2"
          />
          <div>
            <h1 className="text-lg md:text-2xl">{user?.fullName}</h1>
            <p className="text-sm text-gray-400">@{user?.username}</p>
            <p className="text-sm text-gray-400">
              {formatSubscribersCount(subscribers)} ·{" "} {formatSubscribedChannelsCount(subscribedTo?.length || 0)}
            </p>
          </div>
        </div>
        <SubscribeButton channelId={channelId}/>
      </div>
    </div>
  );
};

export default Channel;
