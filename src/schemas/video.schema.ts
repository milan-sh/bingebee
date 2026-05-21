import { z } from "zod";

export const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024;

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ACCEPTED_THUMBNAIL_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const VideoUploadSchema = z.object({
  videoFile: z
    .instanceof(File, { message: "Please select a video file." })
    .refine(
      (file) => file.size <= MAX_VIDEO_SIZE,
      "Video must be less than 100MB.",
    )
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Only .mp4, .mov, and .webm files are accepted.",
    ),
  thumbnail: z
    .instanceof(File, { message: "Please select a thumbnail image." })
    .refine(
      (file) => file.size <= MAX_THUMBNAIL_SIZE,
      "Thumbnail must be less than 2MB.",
    )
    .refine(
      (file) => ACCEPTED_THUMBNAIL_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp files are accepted.",
    ),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be at most 100 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 500 characters."),
});

export type VideoData = z.infer<typeof VideoUploadSchema>;

// Edit only updates the thumbnail, title and description — the video file
// itself can't be changed, and the thumbnail is optional (keep the existing one).
export const VideoEditSchema = VideoUploadSchema.pick({
  title: true,
  description: true,
}).extend({
  thumbnail: VideoUploadSchema.shape.thumbnail.optional(),
});

export type VideoEditData = z.infer<typeof VideoEditSchema>;
