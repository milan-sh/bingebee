import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAvatar } from "@/api/user.api";
import { useUserStore } from "@/store/userStore";

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (file: File) => updateAvatar(file),
    onSuccess: (response) => {
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["channel-profile"] });
      toast.success(response.message || "Avatar updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update avatar");
    },
  });
};
