import { z } from "zod";

export const PlaylistVideoSchema = z.object({
  _id: z.string(),
  thumbnail: z.string(),
});

export type PlaylistVideo = z.infer<typeof PlaylistVideoSchema>;

export const PlaylistSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  owner: z.string(),
  videos: z.array(PlaylistVideoSchema).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Playlist = z.infer<typeof PlaylistSchema>;

export const CreatePlaylistSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(60, "Name must be at most 60 characters."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters.")
    .max(300, "Description must be at most 300 characters."),
});

export type CreatePlaylistData = z.infer<typeof CreatePlaylistSchema>;
