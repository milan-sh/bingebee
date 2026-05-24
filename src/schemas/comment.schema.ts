import { z } from "zod";

export const commentSchema = z.object({
  _id: z.string(),
  content: z.string(),
  video: z.string(),
  owner: z.object({
    _id: z.string(),
    fullName: z.string(),
    avatar: z.string(),
    username: z.string(),
  }),
  createdAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;

export const CommentFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty.")
    .max(1000, "Comment must be at most 1000 characters."),
});

export type CommentFormData = z.infer<typeof CommentFormSchema>;
