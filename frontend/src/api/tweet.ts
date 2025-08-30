import { apiClient } from "./axios"

const fetchUserTweets = (userId:string)=>{
    return apiClient.get(`/tweet/user/${userId}`)
}

export {fetchUserTweets}