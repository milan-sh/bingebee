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

export {getPublicVideos,uploadAVideo,getVideoById}