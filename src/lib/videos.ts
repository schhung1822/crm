import { getDB } from "@/lib/db";
import { videoSchema, Video } from "@/app/(main)/kenh/video/_components/schema";

export async function getVideos(): Promise<Video[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(
    `
    SELECT 
      video_id, title, hashtag,
      view, likes, comment, share, download,
      duration, collect, create_time, tiktok_id, thumbnail_ai_dyamic, id_kenh
    FROM video
    ORDER BY create_time DESC
    `
  );

  return (rows ?? []).map((r) =>
    videoSchema.parse({
      video_id: String(r.video_id),
      title: String(r.title ?? ""),
      hashtag: r.hashtag ? String(r.hashtag) : "",
      likes: Number(r.likes) || 0,
      view: Number(r.view) || 0,
      comment: Number(r.comment) || 0,
      share: Number(r.share ?? 0),
      download: Number(r.download ?? 0),
      duration: Number(r.duration ?? 0),
      collect: Number(r.collect ?? 0),
      create_time: new Date(r.create_time),
      tiktok_id: String(r.tiktok_id ?? ""),
      thumbnail_ai_dyamic: String(r.thumbnail_ai_dyamic ?? ""),
      id_kenh: String(r.id_kenh ?? ""),
    })
  );
}

