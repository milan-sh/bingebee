import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCoverImage } from "@/api/user.api";
import { useUserStore } from "@/store/userStore";

export const useUpdateCoverImage = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (file: File) => updateCoverImage(file),
    onSuccess: (response) => {
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      }
      queryClient.invalidateQueries({ queryKey: ["channel-profile"] });
      toast.success(response.message || "Cover image updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update cover image");
    },
  });
};
