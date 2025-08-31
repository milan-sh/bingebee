import { apiClient } from "./axios"

const getCurrentUserProfile =()=>{
    return apiClient.get('/users/current-user')
}

const updateCoverImage = (data:FormData)=>{
    return apiClient.patch(`/users/cover-image`, data)
}

export {updateCoverImage, getCurrentUserProfile}