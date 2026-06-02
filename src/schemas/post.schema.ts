import { z } from "zod";

export const PostSchema = z.object({
  _id: z.string(),
  content: z.string(),
  owner: z.object({
    _id: z.string(),
    fullName: z.string(),
    avatar: z.string(),
    username: z.string(),
  }),
  isLiked: z.boolean().default(false),
  createdAt: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const PostFormSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post cannot be empty.")
    .max(1000, "Post must be at most 1000 characters."),
});

export type PostFormData = z.infer<typeof PostFormSchema>;
