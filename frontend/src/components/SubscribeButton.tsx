import {UserRoundCheck, UserRoundMinus} from "lucide-react"
import Button from "./Button"
import {toggleSubscription, isSubscribed} from "@/api/subscription.ts"
import {requestHandler} from "@/utils/index.ts"
import { useEffect, useState } from "react"

const SubscribeButton = ({channelId}: {channelId: string}) => {

  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribeToggle = async()=>{
    await requestHandler(
      async()=> toggleSubscription(channelId),
      setLoading,
      ()=> setSubscribed(prev => !prev),
      (errMssg)=> console.log(errMssg || "Something went wrong")
    )
  }

  useEffect(()=>{
    async function fetchSubscriptionStatus(){
      await requestHandler(
        async()=> isSubscribed(channelId),
        setLoading,
        (res)=> setSubscribed(res.data.status),
        (errMssg)=> console.log(errMssg || "Something went wrong")
      )
    }
    fetchSubscriptionStatus()
  } ,[])

  return (
    <Button className="flex items-center gap-2"
    onClick={handleSubscribeToggle}
    >{subscribed ? <UserRoundMinus /> : <UserRoundCheck />} {subscribed ? "Unsubscribe" : "Subscribe"}</Button>
  )
}

export default SubscribeButton
