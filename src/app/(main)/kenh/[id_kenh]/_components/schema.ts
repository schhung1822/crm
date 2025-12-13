// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const videoSchema = z.object({
  video_id: z.string(),
  title: z.string(),
  hashtag: z.string().default(""),
  view: z.number(),
  likes: z.number(),
  comment: z.number(),
  download: z.number(),
  share: z.number(),
  duration: z.number(),
  collect: z.number(),
  create_time: z.date(),
  tiktok_id: z.string(),
  thumbnail_ai_dyamic: z.string(),
  id_kenh: z.string(),
});

export type Video = z.infer<typeof videoSchema>;
