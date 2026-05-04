import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth.api";
import type { LoginData } from "@/schemas/auth.schema";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};
