"use client";

import { Link, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

import { videoSchema } from "./schema";
import Image from "next/image";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function TableCellViewer({ item }: { item: z.infer<typeof videoSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {/* Ô trong bảng sẽ hiển thị tên kênh */}
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <img src={item.thumbnail_ai_dyamic} alt={item.title} className="w-[100%] h-auto rounded-[20px] object-cover" />

          <DrawerTitle><a href={`https://www.tiktok.com/@${item.id_kenh}/video/${item.video_id}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">{item.title}</a> </DrawerTitle>
          {/* có thể dùng id_kenh như username */}
          <DrawerDescription>
            @{item.hashtag}
          </DrawerDescription>

          {/* --- THUMBNAIL TRÊN TIÊU ĐỀ --- */}
            {/* <div className="relative w-full max-w-[260px]">
              <Image
                src={item.thumbnail_ai_dyamic}
                alt={item.title}
                width={260}
                height={460}
                className="rounded-xl object-cover aspect-[9/16] shadow-sm"
                sizes="(max-width: 768px) 200px, 260px"
                // Nếu chưa cấu hình domain ảnh, tạm bỏ tối ưu hoá để tránh lỗi:
                // unoptimized
              />
            </div> */}
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  • Lượt xem: {item.view.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Lượt thích:{" "} {item.likes.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Bình luận: {item.comment.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Lượt chia sẻ: {item.share.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Lượt tải: {item.download.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Lượt lưu: {item.collect.toLocaleString("vi-VN")}
                </div>
                <div className="flex gap-2 leading-none font-medium">
                  • Thời gian: {item.duration.toLocaleString("vi-VN")}s
                </div>
              </div>
              <Separator />
            </>
          )}
        </div>

        <DrawerFooter>
          <Button className="cursor-pointer">Xem top bình luận</Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
