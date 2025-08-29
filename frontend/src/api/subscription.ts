import { apiClient } from "./axios"

const channelSubscribers = (channelId:string)=>{
    return apiClient.get(`/subscriptions/c/${channelId}`)
}

const subscribedChannels = (channelId:string)=>{
    return apiClient.get(`/subscriptions/u/${channelId}`)
}

const toggleSubscription = (channelId:string)=>{
    return apiClient.post(`/subscriptions/c/${channelId}`)
}

const isSubscribed = (channelId:string)=>{
    return apiClient.get(`/subscriptions/status/c/${channelId}`)
}

export {channelSubscribers, toggleSubscription, isSubscribed, subscribedChannels}