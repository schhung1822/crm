"use client";

import { BadgeCheck } from "lucide-react";
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
import Link from "next/link";
import { SectionCardsView } from "./section-cards-viewer";

// ---- Nhận stats qua props (từ Server/parent) ----
type Stats = {
  totalOrders: number;
  totalTienHang: number;
  totalThanhTien: number;
  totalQuantity: number;
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
            <div className="min-w-0">
              <DrawerTitle className="truncate">{item.name_customer}</DrawerTitle>
              <DrawerDescription className="truncate">
                Mã đơn: {item.order_ID} • {item.brand}
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

          <div className="flex flex-col gap-3">
            <Label>Thông tin đơn hàng</Label>
            <DrawerDescription>Khách: {item.name_customer}</DrawerDescription>
            <DrawerDescription>SDT: {item.phone}</DrawerDescription>
            <DrawerDescription>Địa chỉ: {item.address}</DrawerDescription>
            <DrawerDescription>Số lượng: {item.quantity}</DrawerDescription>
            <DrawerDescription>Tiền hàng: {(item.tien_hang || 0).toLocaleString("vi-VN")}</DrawerDescription>
            <DrawerDescription>Giảm giá: {(item.giam_gia || 0).toLocaleString("vi-VN")}</DrawerDescription>
            <DrawerDescription>Thành tiền: {(item.thanh_tien || 0).toLocaleString("vi-VN")}</DrawerDescription>
            <DrawerDescription>Trạng thái: {item.status}</DrawerDescription>
            <DrawerDescription>Người bán: {item.seller}</DrawerDescription>
            <DrawerDescription>Ghi chú: {item.note}</DrawerDescription>
            <DrawerDescription>Ngày tạo: {createdAt}</DrawerDescription>
          </div>
        </div>

        <DrawerFooter>
          <Link href={`/orders/${item.order_ID}`} className="w-full"> <Button className="w-full cursor-pointer">Xem chi tiết đơn</Button> </Link>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
