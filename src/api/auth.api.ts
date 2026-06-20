import { apiClient } from "./index.api";
import type { LoginData, SignupData } from "@/schemas/auth.schema";
import { type ApiResponse } from "@/types/api.types";
import { type User } from "@/types/user.types";

export const login = async (
  data: LoginData,
): Promise<ApiResponse<{ user: User }>> => {
  const response = await apiClient.post("/users/login", data);
  return response.data;
};

export const signup = async (
  data: SignupData,
): Promise<ApiResponse<{ user: User }>> => {
  const response = await apiClient.post("/users/register", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/users/logout");
};
