import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/auth.api";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

export const useLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
