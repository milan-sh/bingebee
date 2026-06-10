import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePassword } from "@/api/user.api";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
      changePassword(payload),
    onSuccess: (response) => {
      toast.success(response.message || "Password updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update password");
    },
  });
};
