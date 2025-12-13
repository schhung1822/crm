"use client";

import { BadgeCheck, Link } from "lucide-react";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { channelSchema } from "./schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { SectionCardsView } from "./section-cards-viewer";

// ---- Nhận stats qua props (từ Server/parent) ----
type Stats = {
  totalChannels: number;
  totalFollowers: number;
  totalVideos: number;
  totalLikes: number;
  first_follower?: number;
  first_video?: number;
  first_like?: number;
};

export function TableCellViewer({
  item,
  stats,
}: {
  item: z.infer<typeof channelSchema>;
  stats: Stats; // bắt buộc có; nếu muốn optional có thể đổi stats?: Stats
}) {
  const isMobile = useIsMobile();

  const createdAt =
    item.create_time instanceof Date
      ? item.create_time.toLocaleDateString("vi-VN")
      : item.create_time;

  // verified có thể là 1 | "1" | true
  const isVerified =
    item.verified === 1 || item.verified === "1" || item.verified === true;

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar + badge */}
            <div className="relative">
              <Avatar className="h-12 w-12 shrink-0 rounded-full ring-2 ring-white/50 shadow-[0_0_12px_rgba(56,189,248,0.65)]">
                <AvatarImage
                  src={item.avatar_medium || undefined}
                  alt={item.name}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="rounded-full bg-gray-300">
                  {getInitials(item.name)}
                </AvatarFallback>
              </Avatar>

              {isVerified && (
                <span className="absolute -bottom-1 -right-1 z-10 rounded-full bg-white p-0.5 shadow ring-1 ring-black/5 pointer-events-none">
                  <BadgeCheck className="h-4 w-4 text-sky-500" />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <DrawerTitle className="truncate">{item.name}</DrawerTitle>
              <DrawerDescription className="truncate">
                @{item.id_kenh} <br />• TikTok ID: {item.tiktok_id}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <Separator />
                {/* stats đến từ parent */}
                <SectionCardsView stats={stats} />
              <Separator />
            </>
          )}

          {/* Thông tin kênh */}
          <div className="flex flex-col gap-3">
            <Label>Mô tả</Label>
            <DrawerDescription>{item.signature}</DrawerDescription>
          </div>

          <br />

          <div className="flex flex-col gap-3">
            <Label htmlFor="id_kenh">Link kênh</Label>
            <a
              className="hover:text-amber-600"
              href={`https://www.tiktok.com/@${item.id_kenh}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`https://www.tiktok.com/@${item.id_kenh}`}
            </a>
          </div>

          <br />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label>Tình trạng kênh</Label>
              <DrawerDescription>
                {item.privateAccount ? "Riêng tư" : "Công khai"}
              </DrawerDescription>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Ngày tạo kênh</Label>
              <DrawerDescription>{createdAt}</DrawerDescription>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button className="w-full cursor-pointer">Xem chi tiết kênh</Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
