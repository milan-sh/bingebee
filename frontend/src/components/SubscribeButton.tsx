import {UserRoundPlus, UserRoundMinus} from "lucide-react"
import Button from "./Button"
import {toggleSubscription} from "@/api/subscription.ts"
import {requestHandler} from "@/utils/index.ts"
import { useState } from "react"
import { toast } from "sonner"

const SubscribeButton = ({channelId, status}: {channelId: string, status:boolean}) => {

  const [subscribed, setSubscribed] = useState(status)
  const [loading, setLoading] = useState(false)

  const handleSubscribeToggle = async()=>{
    await requestHandler(
      async()=> toggleSubscription(channelId),
      setLoading,
      ()=> setSubscribed(prev => !prev),
      (errMssg)=> toast.error(errMssg || "Something went wrong")
    )
  }

  return (
    <Button className="flex items-center gap-2"
    disabled={loading}
    onClick={handleSubscribeToggle}
    >{subscribed ? <UserRoundMinus /> : <UserRoundPlus />} {subscribed ? "Unsubscribe" : "Subscribe"}</Button>
  )
}

export default SubscribeButton
