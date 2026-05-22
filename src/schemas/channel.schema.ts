import { z } from "zod";

export const ChannelSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.email(),
  fullName: z.string(),
  avatar: z.string(),
  coverImage: z.string().optional(),
  subscribersCount: z.number(),
  channelsSubscribedToCount: z.number(),
  isSubscribed: z.boolean(),
});

export type Channel = z.infer<typeof ChannelSchema>;
