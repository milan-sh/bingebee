import {apiClient} from "./axios"

const videoAlreadyLiked = (videoId:string)=>{
    return apiClient.get(`like/status/v/${videoId}`)
}

const toggleVideoLike = (videoId:string)=>{
    return apiClient.post(`like/toggle/v/${videoId}`)
}

export { toggleVideoLike, videoAlreadyLiked }