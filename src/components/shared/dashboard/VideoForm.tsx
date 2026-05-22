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
import { useCallback, useEffect, useMemo } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VideoUploadSchema,
  VideoEditSchema,
} from "@/schemas/video.schema";
import { useUploadVideo } from "@/hooks/video/useUploadVidoe";
import { useUpdateVideo } from "@/hooks/video/useUpdateVideo";

type FormValues = {
  videoFile?: File;
  thumbnail?: File;
  title: string;
  description: string;
};

type VideoFormProps = {
  mode?: "create" | "edit";
  videoId?: string;
  defaultValues?: {
    title?: string;
    description?: string;
    thumbnail?: string;
  };
  onSuccess?: () => void;
};

const VideoForm = ({
  mode = "create",
  videoId,
  defaultValues,
  onSuccess,
}: VideoFormProps) => {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(
      isEdit ? VideoEditSchema : VideoUploadSchema,
    ) as Resolver<FormValues>,
    mode: "onChange",
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      videoFile: undefined,
      thumbnail: undefined,
    },
  });

  const videoFile = watch("videoFile");
  const thumbnailFile = watch("thumbnail");

  const {
    mutate: uploadVideo,
    isPending: isUploading,
    error: uploadError,
  } = useUploadVideo();
  const {
    mutate: updateVideo,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateVideo();

  const isPending = isEdit ? isUpdating : isUploading;
  const error = isEdit ? updateError : uploadError;

  // Preview the newly-picked thumbnail, falling back to the existing one in edit mode.
  const newThumbnailUrl = useMemo(
    () => (thumbnailFile ? URL.createObjectURL(thumbnailFile) : null),
    [thumbnailFile],
  );
  useEffect(() => {
    return () => {
      if (newThumbnailUrl) URL.revokeObjectURL(newThumbnailUrl);
    };
  }, [newThumbnailUrl]);
  const thumbnailPreview = newThumbnailUrl ?? defaultValues?.thumbnail ?? null;

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("description", data.description);
    if (data.thumbnail) fd.append("thumbnail", data.thumbnail);

    if (isEdit && videoId) {
      updateVideo(
        { videoId, data: fd },
        {
          onSuccess: () => onSuccess?.(),
        },
      );
      return;
    }

    if (data.videoFile) fd.append("videoFile", data.videoFile);
    uploadVideo(fd, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <DialogContent className="sm:max-w-xl max-h-[90dvh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit Video" : "Upload Video"}</DialogTitle>
      </DialogHeader>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Video file — only when uploading; the video itself can't be edited. */}
        {!isEdit && (
          <>
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
          </>
        )}
        <FieldGroup className="mt-4">
          <Field>
            <FieldLabel htmlFor="thumbnail">
              Thumbnail{isEdit ? "" : "*"}
            </FieldLabel>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="aspect-video w-full max-w-xs rounded-md border object-cover"
              />
            )}
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
            {isEdit && (
              <FieldDescription>
                Leave empty to keep the current thumbnail.
              </FieldDescription>
            )}
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
          disabled={!isValid || isPending || (isEdit ? !isDirty : false)}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Saving..." : "Uploading..."}
            </>
          ) : isEdit ? (
            "Save changes"
          ) : (
            "Upload"
          )}
        </Button>
      </form>
    </DialogContent>
  );
};

export default VideoForm;
