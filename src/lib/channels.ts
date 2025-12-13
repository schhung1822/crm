// src/lib/channels.ts
import { channelSchema, Channel } from "@/app/(main)/kenh/_components/schema";
import { getDB } from "@/lib/db"; // <-- đổi về getDB

export async function getChannels(): Promise<Channel[]> {
  const db = getDB();
  const [rows] = await db.query<any[]>(`
    SELECT
      id_kenh, name, follower, video_quantiy, \`like\`,
      tiktok_id, avatar_thumb, avatar_medium, signature, create_time,
      verified, privateAccount, first_follower, first_video, first_like
    FROM kenh
    ORDER BY follower DESC
  `);

  return (rows ?? []).map((r) =>
  channelSchema.parse({
      id_kenh: String(r.id_kenh),
      name: String(r.name ?? ""),
      follower: Number(r.follower) || 0,
      video_quantiy: Number(r.video_quantiy) || 0,
      like: Number(r.like) || 0,
      tiktok_id: String(r.tiktok_id ?? ""),
      avatar_thumb: String(r.avatar_thumb ?? ""),
      avatar_medium: String(r.avatar_medium ?? ""),
      signature: String(r.signature ?? ""),
      create_time: r.create_time ? new Date(r.create_time) : new Date(0),
      verified: Number(r.verified ?? 0),
      privateAccount: Number(r.privateAccount ?? 0),
      first_follower: Number(r.first_follower ?? 0),
      first_video: Number(r.first_video ?? 0),
      first_like: Number(r.first_like ?? 0),
    })
  );
}
