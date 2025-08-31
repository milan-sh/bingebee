import { apiClient } from "./axios"

const getCurrentUserProfile =()=>{
    return apiClient.get('/users/current-user')
}

const updateCoverImage = (data:FormData)=>{
    return apiClient.patch(`/users/cover-image`, data)
}

const updateAvatar = (data:FormData)=>{
    return apiClient.patch(`users/avatar`, data)
}

export {updateCoverImage, getCurrentUserProfile, updateAvatar}