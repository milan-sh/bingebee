import { useMutation } from "@tanstack/react-query";
import { sendFeedback } from "@/api/user.api";
import { toast } from "sonner";

export const useSendFeedback = () => {
  return useMutation({
    mutationFn: (data: string) => sendFeedback(data),
    onSuccess: () => {
      toast.success("Feedback sent successfully! Thank you for your input.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
