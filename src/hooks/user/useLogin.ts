import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth.api";
import type { LoginData } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/store/userStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data?.user);
        toast.success(response.message || "Logged in successfully");
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};
