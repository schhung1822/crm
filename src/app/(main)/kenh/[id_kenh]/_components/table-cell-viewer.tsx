"use client";

import {
  Link as LinkIcon,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Bookmark,
  Clock,
  Hash,
  ExternalLink,
} from "lucide-react";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { videoSchema } from "./schema";


/* ============ CONFIG ============ */
// đặt URL ảnh mặc định (hình vuông) – bạn thay URL này sau
const DEFAULT_THUMB = "https://p16-va-tiktok.ibyteimg.com/obj/musically-maliva-obj/4a953b362d24032d2d825d791cc5771d";

/* ============ UTILS ============ */
const fmt = (n: number) => Number(n || 0).toLocaleString("vi-VN");
const normTags = (h?: string) => {
  const s = (h ?? "").trim();
  if (!s) return [];
  // nhận dạng các hashtag #tag hoặc tách theo khoảng trắng
  const tokens = s.split(/\s+/).map((t) => t.trim());
  // bỏ trùng + chỉ giữ từ có ký tự
  return Array.from(new Set(tokens.filter(Boolean)));
};

function Thumb({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  // Dùng <img> để tránh lỗi domain Next/Image.
  // Có fallback khi lỗi/thiếu ảnh.
  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <img
        src={src && src.length > 10 ? src : DEFAULT_THUMB}
        alt={alt}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = DEFAULT_THUMB;
        }}
        className="w-full h-auto rounded-2xl object-cover"
        // ép tỷ lệ 9:16 nếu là video frame, nếu muốn luôn vuông có thể đổi thành aspect-square
        style={{ aspectRatio: "3 / 4" }}
      />
    </div>
  );
}

/* ============ COMPONENT ============ */
export function TableCellViewer({
  item,
}: {
  item: z.infer<typeof videoSchema>;
}) {
  const isMobile = useIsMobile();
  const tags = normTags(item.hashtag);

  const videoLink = `https://www.tiktok.com/@${item.id_kenh?.replace(/^@/, "")}/video/${item.video_id}`;

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.title}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="sm:max-w-[460px] sm:ml-auto">
        {/* HEADER */}
        <DrawerHeader className="gap-2">
          {/* Thumbnail */}
          <Thumb src={item.thumbnail_ai_dyamic} alt={item.title} />

          {/* Tiêu đề + link */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <DrawerTitle className="text-base leading-snug">
              {item.title}
            </DrawerTitle>
            <a
              href={videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300"
              title="Mở trên TikTok"
            >
              <ExternalLink className="size-5" />
            </a>
          </div>

          {/* Hashtags */}
          {!!tags.length && (
            <DrawerDescription className="mt-1">
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-muted/40 px-2 py-1 text-xs text-muted-foreground"
                  >
                    <Hash className="size-3.5" />
                    {t.replace(/^#/, "")}
                  </span>
                ))}
              </div>
            </DrawerDescription>
          )}
        </DrawerHeader>

        {/* BODY */}
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm  nice-scroll  max-h-[80vh] sm:max-h-[82vh] ">
          <Separator />

          {/* Hàng chỉ số kiểu TikTok */}
          <div className="grid grid-cols-2 gap-3">
            <Stat icon={<Eye className="size-4" />} label="Lượt xem" value={fmt(item.view)} />
            <Stat icon={<Heart className="size-4" />} label="Lượt thích" value={fmt(item.likes)} />
            <Stat icon={<MessageCircle className="size-4" />} label="Bình luận" value={fmt(item.comment)} />
            <Stat icon={<Share2 className="size-4" />} label="Chia sẻ" value={fmt(item.share)} />
            <Stat icon={<Download className="size-4" />} label="Tải về" value={fmt(item.download)} />
            <Stat icon={<Bookmark className="size-4" />} label="Lưu" value={fmt(item.collect)} />
          </div>

          {/* Thời lượng + link tiktok id */}
          <div className="grid grid-cols-2 gap-3">
            <Chip icon={<Clock className="size-4" />} text={`${fmt(item.duration)}s`} />
            <a
              href={`https://www.tiktok.com/@${item.id_kenh?.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-muted/20 px-3 py-2 text-xs text-muted-foreground hover:bg-muted/30"
            >
              @{item.id_kenh?.replace(/^@/, "")}
            </a>
          </div>

          <Separator />
        </div>

        {/* FOOTER */}
        <DrawerFooter className="gap-2">
          <Button className="cursor-pointer inline-flex items-center gap-2">
            <MessageCircle className="size-4" />
            Xem top bình luận
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

/* ============ SUB COMPONENTS ============ */
function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/10 px-3 py-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground/80">{icon}</span>
        <span className="text-xs">{label}</span>
      </div>
      <div className="tabular-nums font-medium">{value}</div>
    </div>
  );
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
      <span className="text-foreground/80">{icon}</span>
      {text}
    </div>
  );
}
