import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAccountDetails } from "@/api/user.api";
import { useUserStore } from "@/store/userStore";
import type { UpdateAccountData } from "@/schemas/profile.schema";

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateAccountData) => updateAccountDetails(data),
    onSuccess: (response, variables) => {
      // Prefer the user returned by the server, but fall back to merging the
      // submitted values so the store always reflects the change regardless of
      // the endpoint's response shape.
      const current = useUserStore.getState().user;
      const updatedUser =
        response.data?.user ?? (current ? { ...current, ...variables } : null);
      if (updatedUser) {
        setUser(updatedUser);
      }
      queryClient.invalidateQueries({ queryKey: ["channel-profile"] });
      toast.success(response.message || "Profile updated");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};
