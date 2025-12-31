"use client";

import * as React from "react";
import { z } from "zod";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Phone,
  Package,
  User2,
  Tag,
  UserCheck,
  FileText,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingBag } from "lucide-react";
import { channelSchema } from "./schema";

type Stats = {
  totalOrders: number;
  totalTienHang: number;
  totalThanhTien: number;
  totalQuantity: number;
};

function formatDateVN(v: unknown) {
  if (!v) return "—";
  const d = v instanceof Date ? v : new Date(String(v));
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString("vi-VN");
}
function money(v: unknown) {
  const n = typeof v === "number" ? v : Number(String(v ?? 0).replaceAll(",", ""));
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("vi-VN");
}

function StatPill({
  label,
  value,
  sub = "VNĐ",
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card/60 px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-0.5 flex items-baseline justify-between gap-2">
        <div className="text-base font-semibold tabular-nums leading-none">{value}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value ?? "—"}</div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card/60 p-3">
      <div className="mb-2 text-sm font-semibold">{title}</div>
      <div className="grid gap-2.5">{children}</div>
    </div>
  );
}

export function TableCellViewer({
  item,
  stats,
}: {
  item: z.infer<typeof channelSchema>;
  stats: Stats;
}) {
  const isMobile = useIsMobile();

  const createdAt = formatDateVN(item.create_time);

  const tienHang = money(item.tien_hang || 0);
  const giamGia = money(item.giam_gia || 0);
  const thanhTien = money(item.thanh_tien || 0);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.order_ID}
        </Button>
      </DrawerTrigger>

      {/* ✅ max width 400px, full height on desktop */}
      <DrawerContent className="h-[100vh] sm:h-[100vh] sm:max-w-[400px] sm:ml-auto">
        {/* HEADER - sticky */}
        <DrawerHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DrawerTitle className="truncate">Mã đơn: {item.order_ID}</DrawerTitle>
                <DrawerDescription className="truncate">
                  {item.brand ? <>• {item.brand}</> : null}
                </DrawerDescription>
              </div>

              {item.status ? (
                <Badge variant="secondary" className="shrink-0 rounded-full">
                  {String(item.status)}
                </Badge>
              ) : null}
            </div>
          </div>
        </DrawerHeader>

        {/* BODY - scroll */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* KPI */}
          <div className="grid gap-3">
            <Block title="Khách hàng">
              <Row icon={<User2 className="h-4 w-4" />} label="Tên khách" value={item.name_customer} />
              <Row icon={<Phone className="h-4 w-4" />} label="Số điện thoại" value={item.phone ?? "—"} />
              <Row icon={<MapPin className="h-4 w-4" />} label="Địa chỉ" value={item.address ?? "—"} />
            </Block>

            <div className="mt-2 flex flex-wrap gap-2">
              {item.seller ? (
                <Badge variant="outline" className="rounded-full">
                  <UserCheck className="mr-1 h-3.5 w-3.5" />
                  {String(item.seller)}
                </Badge>
              ) : null}

              <Badge variant="outline" className="rounded-full">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                {createdAt}
              </Badge>
            </div>

            <Block title="Thông tin đơn hàng">
              {/* Header gọn 2 dòng */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] text-muted-foreground">Mã sản phẩm</div>
                  <div className="truncate text-sm font-semibold text-foreground">
                    {item.pro_ID}
                  </div>
                </div>

                {item.status ? (
                  <Badge variant="secondary" className="shrink-0 rounded-full">
                    {String(item.status)}
                  </Badge>
                ) : null}
              </div>

              <Separator />

              {/* Sản phẩm + thương hiệu sản phẩm */}
              <Row
                icon={<ShoppingBag className="h-4 w-4" />}
                label="Sản phẩm"
                value={item.name_pro ?? "—"}
              />
              <Row
                icon={<Package className="h-4 w-4" />}
                label="Số luợng"
                value={item.quantity ?? "—"}
              />
              <Row
                icon={<Tag className="h-4 w-4" />}
                label="Thương hiệu SP"
                value={item.brand_pro ?? "—"}
              />
              <Separator />

              {/* Tóm tắt thanh toán: 3 pill gọn */}
              <div className="grid grid-cols-1 gap-2">
                <StatPill label="Tiền hàng" value={money(item.tien_hang || 0)} />
                <StatPill label="Giảm giá" value={money(item.giam_gia || 0)} />
                <StatPill label="Thành tiền" value={money(item.thanh_tien || 0)} />
              </div>
            </Block>


            <Block title="Ghi chú">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-muted-foreground">Nội dung</div>
                  <div className="mt-0.5 whitespace-pre-wrap break-words text-sm text-foreground/90">
                    {item.note ? String(item.note) : "—"}
                  </div>
                </div>
              </div>
            </Block>
          </div>
        </div>

        {/* FOOTER - sticky */}
        <DrawerFooter className="sticky bottom-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t">
          {/* <Link href={`/kenh/${item.id_kenh}`} className="w-full">
            <Button className="w-full rounded-xl">Xem chi tiết kênh</Button>
          </Link> */}

          <DrawerClose asChild>
            <Button variant="outline" className="w-full rounded-xl">
              Đóng
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
