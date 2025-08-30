import { Button, Input, LoadingSvg } from "../components/index.ts";
import { useForm } from "react-hook-form";
import type { VideoUpload } from "../interfaces/video.ts";
import { useCallback, useState } from "react";
import {
  useDropzone,
  type DropzoneOptions,
  type FileRejection,
} from "react-dropzone";
import { Upload } from "lucide-react";
import { requestHandler } from "@/utils/index.ts";
import { uploadAVideo } from "@/api/video.ts";
import { DialogContent, DialogHeader } from "@/components/ui/dialog.tsx";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";

const VALID_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

const VideoUploadDialog = () => {
  const [videoFilePreview, setVideoFilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<VideoUpload>({
    defaultValues: {
      title: "",
      description: "",
      videoFile: null,
      thumbnail: null,
    },
  });

  //validate video file
  const validateVideoFile = (file: File) => {
    if (!VALID_VIDEO_TYPES.includes(file.type)) {
      return "Only MP4, WebM, or OGG videos are allowed";
    }
    if (file.size > MAX_VIDEO_SIZE) {
      return "File size must be less than 100MB.";
    }
    return true;
  };

  //Handle Video File Drop
  const onVideoDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const validationResult = validateVideoFile(file);
        if (validationResult === true) {
          setValue("videoFile", file);
          setVideoFilePreview(URL.createObjectURL(file));
          clearErrors("videoFile");
        } else {
          setError("videoFile", { type: "manual", message: validationResult });
        }
      }

      //Handle rejected files
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        setError("videoFile", {
          type: "manual",
          message: rejection.errors[0]?.message || "Invalid file",
        });
      }
    },
    [setValue, setError, clearErrors]
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop: onVideoDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
    },
    maxFiles: 1,
    maxSize: MAX_VIDEO_SIZE,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const onSubmit = async (data: VideoUpload) => {
    // Basic form validation
    if (!data.videoFile) {
      setError("videoFile", {
        type: "manual",
        message: "Video file is required",
      });
      return;
    }
    if (!data.thumbnail) {
      setError("thumbnail", {
        type: "manual",
        message: "Thumbnail is required",
      });
      return;
    }

    const formData = new FormData();

    //append all fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail[0]);

    await requestHandler(
      async () => await uploadAVideo(formData),
      setIsLoading,
      () => {
        toast.success("Video uploaded successfully");
        reset();
        setVideoFilePreview(null);
      },
      (errMessg) => {
        console.log(errMessg);
        toast.error(errMessg || "Video not uploaded.");
      }
    );
  };

  return (
    <DialogContent className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[80vh] overflow-y-scroll bg-black border z-50 rounded-none">
      <div className="rounded-none bg-black text-white p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <DialogHeader>
            <DialogTitle>
              <div className="flex justify-between items-center p-2 border-b mb-2">
                <h2 className="text-xl font-semibold">Upload Video</h2>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="disabled:bg-transparent"
                >
                  {isLoading ? <LoadingSvg /> : "Upload"}
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          {/* Vide Dropzone */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Video File *
            </label>
            <div
              {...getRootProps()}
              className={`border border-dashed p-10 text-center cursor-pointer ${
                isDragActive ? "border-blue-500" : "border"
              } ${errors.videoFile ? "border-red-500" : ""}`}
            >
              <input type="file" {...getInputProps()} />
              {isDragActive ? (
                <p className="text-primary">Drop the video file here......</p>
              ) : (
                <div>
                  <div className="mx-auto w-fit mb-2 bg-accent-foreground p-3 rounded-full">
                    <Upload />
                  </div>
                  <p className="text-lg mb-3">
                    Drag & drop a video file here, or{" "}
                    <span className="underline">click</span> to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supported fomats: MP4, WebM, OGG (Max 100MB)
                  </p>
                </div>
              )}
              {watch("videoFile") && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <span className="mr-2">✓</span>
                  {watch("videoFile")?.name}
                </div>
              )}
              {errors.videoFile && (
                <p className="text-red-600 my-0.5">
                  {errors.videoFile.message as string}.
                </p>
              )}
              {videoFilePreview && (
                <div className="mt-4">
                  <video
                    src={videoFilePreview}
                    controls
                    className="max-w-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <Input
            type="file"
            label="Thumbnail*"
            accept="image/*"
            {...register("thumbnail", {
              required: "Thumbnail is required.",
              validate: (files) =>
                (files && files?.length === 1) || "Please upload 1 image",
            })}
            className="file:bg-primary file:px-4 file:py-1"
          />
          {errors.thumbnail && (
            <p className="text-red-600 my-0.5">
              {errors.thumbnail.message as string}.
            </p>
          )}
          <Input
            type="text"
            label="Title*"
            {...register("title", {
              required: "Title is required.",
              minLength: { value: 2, message: "Minimun 2 chars." },
            })}
          />
          {errors.title && (
            <p className="text-red-600 my-0.5">
              {errors.title.message as string}.
            </p>
          )}
          <label htmlFor="description" className="font-semibold">
            Description*
          </label>
          <textarea
            id="description"
            rows={5}
            className="border w-full mt-2 p-2"
            {...register("description", {
              required: "Video description is required.",
              minLength: { value: 20, message: "Minimum 20 chars." },
            })}
          />
          {errors.description && (
            <p className="text-red-600 my-0.5">
              {errors.description.message as string}.
            </p>
          )}
        </form>
      </div>
    </DialogContent>
  );
};

export default VideoUploadDialog;
