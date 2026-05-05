import { apiClient } from "./index.api";
import type { LoginData, SignupData } from "@/schemas/auth.schema";
import { type ApiResponse } from "@/types/api.types";

export const login = async (data: LoginData): Promise<ApiResponse> => {
  const response = await apiClient.post("/users/login", data);
  return response.data;
};

export const signup = async (data: SignupData): Promise<ApiResponse> => {
  const response = await apiClient.post("/users/register", data);
  return response.data;
};
