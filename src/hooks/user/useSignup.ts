import { useMutation } from "@tanstack/react-query";
import { signup } from "@/api/auth.api";
import type { SignupData } from "@/schemas/auth.schema";
import { toast } from "sonner";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => signup(data),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
