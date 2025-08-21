import { apiClient } from "./axios";

const getPublicVideos = ()=>{
    return apiClient.get("/video/videos")
}

const uploadAVideo = (data)=>{
    return apiClient.post("/video/", data)
}

export {getPublicVideos,uploadAVideo}