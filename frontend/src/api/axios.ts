import axios from "axios"
import { LocalStorage } from "@/utils"

const apiClient = axios.create({
    baseURL: "/api/v1",
    timeout: 10000, // Set a timeout of 10 seconds
    withCredentials:true, // Include credentials in requests
})

apiClient.interceptors.request.use(
    (config)=>{
        //Retrieve user token from local storage
        const token = LocalStorage.get("token")
        //Set authorization heads with Bearer token
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export {apiClient};