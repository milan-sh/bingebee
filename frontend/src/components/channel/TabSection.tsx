import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoTab from "./VideoTab"
import PlaylistTab from "./PlaylistTab"
import TweetTab from "./TweetTab"
import SubscribedTab from "./SubscribedTab"

const TabSection = ({channelId}: {channelId:string}) => {
  return (
    <div className="mx-4">
      <Tabs defaultValue="videos">
        <TabsList className="w-full border-b-2 border-gray-400">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="tweets">Tweets</TabsTrigger>
            <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
        </TabsList>
        {/* Tab Contents */}
        <VideoTab channelId={channelId}/>
        <PlaylistTab channelId={channelId}/>
        <TweetTab channelId={channelId}/>
        <SubscribedTab channelId={channelId}/>
      </Tabs>
    </div>
  )
}

export default TabSection
