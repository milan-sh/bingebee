import { apiClient } from "./index.api";
import { type LoginData } from "@/schemas/auth.schema";

export const loging = async (data: LoginData) => {
  await apiClient.post("/users/login", { data });
};
