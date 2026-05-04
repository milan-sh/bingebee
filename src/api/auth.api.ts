import { apiClient } from "./index.api";
import { type LoginData } from "@/schemas/auth.schema";
import { type ApiResponse } from "@/types/api.types";

export const login = async (data: LoginData): Promise<ApiResponse> => {
  const response = await apiClient.post("/users/login", { data });
  return response.data;
};
