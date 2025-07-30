import { apiClient } from "./axios"
import type { SignupFormValues, LoginFormValues } from "../interfaces/form"

const regsiterUser = (data: SignupFormValues) => {
    return apiClient.post("/users/register", data)
}

const loginUser = (data: LoginFormValues) => {
    return apiClient.post("/users/login", data)
}

const logoutUser = () => {
    return apiClient.post("/users/logout")
}

export { regsiterUser, loginUser, logoutUser }