import { apiClient } from "./axios"

export const addVideoToWatchHistory = (videoId:string)=>{
    return apiClient.patch(`/users/history/${videoId}`)
}

export const getUserWatchHistory = ()=>{
    return apiClient.get("users/history")
}