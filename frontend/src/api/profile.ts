import type { UpdatePassword, UpdatePersonalInfo } from "@/interfaces/profile"
import { apiClient } from "./axios"

const getCurrentUserProfile =()=>{
    return apiClient.get('/users/current-user')
}

const getChannelProfile=(username:string)=>{
    return apiClient.get(`/users/c/${username}`)
}

const updateCoverImage = (data:FormData)=>{
    return apiClient.patch(`/users/cover-image`, data)
}

const updateAvatar = (data:FormData)=>{
    return apiClient.patch(`users/avatar`, data)
}

const UpdatePersonalInfoData = (data:UpdatePersonalInfo)=>{
    return apiClient.patch(`/users/update-account`, data)
}

const UpdatePasswordData = (data:UpdatePassword)=>{
    return apiClient.post(`/users/change-password`, data)
}

export {updateCoverImage, getCurrentUserProfile, updateAvatar, UpdatePersonalInfoData, UpdatePasswordData, getChannelProfile}