// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const channelSchema = z.object({
  id_kenh: z.string(),
  name: z.string(),
  follower: z.number(),
  video_quantiy: z.number(),
  like: z.number(),
  tiktok_id: z.string(),
  avatar_thumb: z.string(),
  avatar_medium: z.string(),
  signature: z.string(),
  create_time: z.date(),
  verified: z.number(),
  privateAccount: z.number(),
  first_follower: z.number(),
  first_video: z.number(),
  first_like: z.number(),
});

export type Channel = z.infer<typeof channelSchema>;
