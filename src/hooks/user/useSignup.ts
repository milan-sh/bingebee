import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth.api";
import type { SignupData } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { useUserStore } from "@/store/userStore";

export const useSignup = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: SignupData) => signup(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        setUser(response.data?.user);
        toast.success(response.message || "Account created successfully");
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
