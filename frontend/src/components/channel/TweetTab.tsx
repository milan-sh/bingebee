import { useEffect, useState } from "react"
import { TabsContent } from "../ui/tabs"
import type { Tweet } from "@/interfaces/tweet"
import LoadingSvg from "../LoadingSvg"
import { ThumbsUp, Users } from "lucide-react"
import { requestHandler } from "@/utils"
import { fetchUserTweets } from "@/api/tweet"
import { toast } from "sonner"
import { dateFormatter } from "@/utils/dateFormate"

const TweetTab = ({channelId}:{channelId:string}) => {
    const [tweets, setTweets] = useState<Tweet[] | null>(null)
    const[loading, setLoading] = useState(false)

    async function fetchTweets(){
        await requestHandler(
            async ()=> await fetchUserTweets(channelId),
            setLoading,
            (res)=> setTweets(res.data),
            (err)=> toast.error(err || "something went wrong")
        )
    }

    useEffect(()=>{
        fetchTweets();
    }, [])

    if(loading){
        return (
            <TabsContent value="videos">
                <LoadingSvg/>
            </TabsContent>
        )
    }

    if(!tweets){
        return (
            <TabsContent value="tweets" className="flex flex-col items-center justify-center gap-2 py-4">
                <div className="flex items-center justify-center bg-primary p-2 rounded-full">
                    <Users/>
                </div>
                <h2 className="font-semibold text-gray-200">No Tweets</h2>
                <p className="text-gray-200 max-w-96 text-center">This channel has yet to make <span className="font-bold">Tweet</span>.</p>
            </TabsContent>
        )
    }

  return (
    <TabsContent value="tweets" className="flex flex-col gap-3">
      {tweets.map((tweet)=>(
        <div key={tweet._id} className="border-b border-gray-700 py-3 flex gap-3">
            <img src={tweet.owner?.avatar} alt={tweet.owner.fullName} className="h-14 min-w-14 rounded-full object-cover" />
            <div>
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold text-[18px]">{tweet.owner?.fullName}</h1>
                    <p className="text-gray-400 text-sm">{dateFormatter(tweet.createdAt)}</p>
                </div>
                <h2 className="mt-1">{tweet.content}</h2>
                {/* TODO:Add like and dislike to tweet */}
                {/* <button><ThumbsUp/> </button> */}
            </div>
        </div>
      ))}
    </TabsContent>
  )
}

export default TweetTab
