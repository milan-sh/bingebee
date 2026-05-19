import { useMutation } from "@tanstack/react-query";
import { uploadVideo } from "@/api/video.api";
import { toast } from "sonner";

export const useUploadVideo = () => {
  return useMutation({
    mutationFn: (data: FormData) => uploadVideo(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
  });
};
