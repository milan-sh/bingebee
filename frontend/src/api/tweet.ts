import { apiClient } from "./axios"

const fetchUserTweets = (userId:string)=>{
    return apiClient.get(`/tweet/user/${userId}`)
}

const postTweet = (content:string)=>{
    return apiClient.post(`/tweet/`, {content})
}

export {fetchUserTweets, postTweet}