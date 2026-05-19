import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoUploadSchema,
  type VideoData,
} from "@/schemas/video.schema";
import { useUploadVideo } from "@/hooks/video/useUploadVidoe";

const VideoUpload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<VideoData>({
    resolver: zodResolver(VideoUploadSchema),
    mode: "onChange",
  });

  const videoFile = watch("videoFile");

  const { mutate: uploadVideo, isPending, error } = useUploadVideo();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const file = acceptedFiles[0] ?? fileRejections[0]?.file;
      if (file) {
        setValue("videoFile", file as File, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1,
  });

  const onSubmit: SubmitHandler<VideoData> = (data) => {
    const fd = new FormData();
    fd.append("videoFile", data.videoFile);
    fd.append("thumbnail", data.thumbnail);
    fd.append("title", data.title);
    fd.append("description", data.description);
    uploadVideo(fd, {
      onSuccess: () => reset(),
    });
  };

  return (
    <DialogContent className="sm:max-w-xl max-h-[90dvh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Upload Video</DialogTitle>
      </DialogHeader>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        <div
          className="border-2 border-dashed rounded-sm p-4 flex items-center justify-center cursor-pointer sm:min-h-52"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : videoFile ? (
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-medium break-all">{videoFile.name}</p>
              <p className="text-muted-foreground text-xs">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="bg-accent w-fit p-4 rounded-full">
                <Upload className="sm:h-12 sm:w-12" />
              </div>
              <h2>Drag and drop video file to upload</h2>
              <p className="text-muted-foreground text-sm">
                Your videos will be private until you publish them.
              </p>
              <span className="inline-flex items-center px-3 py-1.5 text-sm border rounded-md">
                Select File
              </span>
            </div>
          )}
        </div>
        {errors.videoFile && (
          <FieldDescription className="text-destructive mt-2">
            {errors.videoFile.message as string}
          </FieldDescription>
        )}
        <FieldGroup className="mt-4">
          <Field>
            <FieldLabel htmlFor="thumbnail">Thumbnail*</FieldLabel>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("thumbnail", file, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
            />
          </Field>
          {errors.thumbnail && (
            <FieldDescription className="text-destructive">
              {errors.thumbnail.message as string}
            </FieldDescription>
          )}
          <Field>
            <FieldLabel htmlFor="title">Title*</FieldLabel>
            <Input id="title" {...register("title")} />
          </Field>
          {errors.title && (
            <FieldDescription className="text-destructive">
              {errors.title.message}
            </FieldDescription>
          )}
          <Field>
            <FieldLabel htmlFor="description">Description*</FieldLabel>
            <Textarea id="description" rows={5} {...register("description")} />
          </Field>
          {errors.description && (
            <FieldDescription className="text-destructive">
              {errors.description.message}
            </FieldDescription>
          )}
        </FieldGroup>
        {error && (
          <FieldDescription className="text-destructive mt-2">
            {error.message}
          </FieldDescription>
        )}
        <Button
          type="submit"
          className="mt-4 w-full py-2"
          disabled={!isValid || isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </form>
    </DialogContent>
  );
};

export default VideoUpload;
