import type { UpdateVideoFormValues } from "@/interfaces/form";
import { apiClient } from "./axios";

const getPublicVideos = ()=>{
    return apiClient.get("/video/videos")
}

const uploadAVideo = (data)=>{
    return apiClient.post("/video/", data)
}

const getVideoById = (id:string)=>{
    return apiClient.get(`/video/${id}`)
}

const toggleVideoPublish = (videoId:string)=>{
    return apiClient.patch(`/video/toggle/publish/${videoId}`)
}

const deleteVideo = (videoId:string)=>{
    return apiClient.delete(`/video/${videoId}`)
}

const updateVideoDetails = (videoId:string, data:FormData)=>{
    return apiClient.patch(`/video/${videoId}`, data)
}

export {getPublicVideos,uploadAVideo,getVideoById,toggleVideoPublish,deleteVideo,updateVideoDetails}