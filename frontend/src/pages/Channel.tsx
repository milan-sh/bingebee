import { useEffect, useState } from "react";
import { requestHandler } from "@/utils";
import type { ChannelProfile } from "@/interfaces/user";
import {
  formatSubscribersCount,
  formatSubscribedChannelsCount,
} from "@/utils/subscriberFromat";
import { toast } from "sonner";
import { Link, useParams } from "react-router";
import { Button, Loader, SubscribeButton, TabSection } from "@/components";
import { getChannelProfile } from "@/api/profile";
import { Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthCotext";

const Channel = () => {
  const [channel, SetChannel] = useState<ChannelProfile | null>(null)
  const [loading, setLoading] = useState(false);

  // const channelId = user?._id

  const {username} = useParams();

  const {user} = useAuth();

 

  //fetch channel profile
  async function fetchChannelProfile() {
    if(!username) return;
    await requestHandler(
      async()=> await getChannelProfile(username),
      setLoading,
      (res)=> {
        SetChannel(res.data)
      },
      (err)=> toast.error(err || "something went wrong.")
    )
    
  }

  useEffect(() => {
    if(username){
      fetchChannelProfile();
    }
  }, [username]);

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen w-full text-white mt-10 md:mt-0">
      {/* profile section */}
      <div className="md:min-h-50 w-full border">
        {channel?.coverImage && (
          <img src={channel.coverImage} className="w-full md:h-50 h-32 object-cover" />
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-center px-4 mb-4">
        <div className="flex gap-4 items-center">
          <img
            src={channel?.avatar}
            alt={channel?.fullName}
            className="h-28 min-w-28 -translate-y-7 rounded-full object-cover border-2"
          />
          <div>
            <h1 className="text-lg md:text-2xl font-semibold">{channel?.fullName}</h1>
            <p className="text-sm text-gray-400">@{channel?.username}</p>
            <p className="text-sm text-gray-400">
              {formatSubscribersCount(channel?.subscribersCount)} ·{" "}
              {formatSubscribedChannelsCount(channel?.channelsSubscribedToCount)}
            </p>
          </div>
        </div>
        {channel?._id === user?._id ? (
          <Link to={`/profile/${user?._id}`}>
            <Button className="flex gap-2 items-center text-lg">
              <Pencil /> Edit
            </Button>
          </Link>
        ) : (
          channel && (<SubscribeButton channelId={channel?._id} status={channel?.isSubscribed}/>)
        )}
      </div>
      {/* Tabs */}
      {channel && <TabSection channelId={channel?._id} />}
    </div>
  );
};

export default Channel;
