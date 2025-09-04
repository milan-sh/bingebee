import axios from "axios"
import { LocalStorage } from "@/utils"
import { useNavigate } from "react-router"

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI || "http://localhost:5000/api/v1",
    timeout: 10000, // Set a timeout of 10 seconds
    withCredentials: true, // Include credentials in requests
})

apiClient.interceptors.request.use(
    (config) => {
        //Retrieve user token from local storage
        const token = LocalStorage.get("token")
        //Set authorization heads with Bearer token
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (err) => {
        const navigate = useNavigate();
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
            localStorage.clear();
            navigate('/login', { replace: true });
            return Promise.reject(err);
        }
        return Promise.reject(err);
    }
)

export { apiClient };