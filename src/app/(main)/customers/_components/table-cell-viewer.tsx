"use client";

import { Cake, Wallet, BadgeCheck, Tags, Landmark, UserPlus, User2 } from "lucide-react";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
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
import { getInitials } from "@/lib/utils";

import { userSchema } from "./schema";

const fmt = (n: unknown) => {
  if (typeof n === "number") return n.toLocaleString("vi-VN");
  const num = Number(String(n ?? "0").replaceAll(",", ""));
  return Number.isFinite(num) ? num.toLocaleString("vi-VN") : String(n);
};

const formatDate = (d: unknown) => {
  if (!d) return "—";
  if (d instanceof Date) return d.toLocaleDateString("vi-VN");
  const date = new Date(String(d));
  return Number.isNaN(date.getTime()) ? String(d) : date.toLocaleDateString("vi-VN");
};

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

function Stat({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/10 px-3 py-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground/80">{icon}</span>
      </div>
      <div className="tabular-nums font-medium">{value}</div>
    </div>
  );
}

export function TableCellViewer({ item }: { item: z.infer<typeof userSchema> }) {
  const isMobile = useIsMobile();

  if (!item) {
    return null;
  }

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
            <div className="relative">
              <Avatar className="h-12 w-12 shrink-0 rounded-full ring-2 ring-white/50 shadow-[0_0_12px_rgba(56,189,248,0.65)]">
                <AvatarImage
                  src="/avatars/nghecontent.jpg"
                  alt={item.name}
                  className="rounded-full object-cover"
                />
                <AvatarFallback className="rounded-full bg-gray-300">
                  {getInitials(item.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="min-w-0">
              <DrawerTitle className="truncate">{item.name}</DrawerTitle>
              <DrawerDescription className="truncate">{item.customer_ID}</DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm nice-scroll max-h-[80vh] sm:max-h-[82vh]">
          {!isMobile && (
            <>
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  <DrawerDescription>Ngày tạo: {createdAt}</DrawerDescription>
                </div>
              </div>
            </>
          )}

          <div className="space-y-3">
            <div className="rounded-2xl border bg-card/60 p-4">
              <div className="text-sm font-semibold mb-3">Thông tin</div>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Số điện thoại</span>
                  <span className="font-medium truncate">{item.phone ?? "—"}</span>
                </div>
                <div className="flex items-start justify-between flex-col gap-3">
                  <span className="text-muted-foreground">Địa chỉ</span>
                  <span className="font-medium ">{item.address ?? "—"}</span>
                </div>
                <div className="flex items-start justify-between flex-col gap-3">
                  <span className="text-muted-foreground">Công ty</span>
                  <span className="font-medium ">{item.company ?? "—"}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border bg-card/60 px-4 py-3">
                <div className="text-xs text-muted-foreground">Nợ hiện tại</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{fmt(item.no_hien_tai)}</div>
                <div className="text-xs text-muted-foreground">VNĐ</div>
              </div>
              <div className="rounded-2xl border bg-card/60 px-4 py-3">
                <div className="text-xs text-muted-foreground">Tổng bán</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{fmt(item.tong_ban)}</div>
                <div className="text-xs text-muted-foreground">VNĐ</div>
              </div>
              <div className="rounded-2xl border bg-card/60 px-4 py-3">
                <div className="text-xs text-muted-foreground">Tổng bán (trừ trả)</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{fmt(item.tong_ban_tru_tra_hang)}</div>
                <div className="text-xs text-muted-foreground">VNĐ</div>
              </div>
              <div className="rounded-2xl border bg-card/60 px-4 py-3">
                <div className="text-xs text-muted-foreground">Giao dịch gần nhất</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">{item.last_payment ? formatDate(item.last_payment) : "—"}</div>
                <div className="text-xs text-muted-foreground">Ngày</div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <Stat icon={<Cake className="size-4" />}  value={formatDate(item.birth)} />
              <Stat icon={<User2 className="size-4" />}  value={item.gender ?? "—"} />
              <Stat icon={<BadgeCheck className="size-4" />}  value={item.class ?? "—"} />
              <Stat icon={<Tags className="size-4" />}  value={item.class ?? "—"} />
              <Stat icon={<Landmark className="size-4" />}  value={item.branch ?? "—"} />
              <Stat icon={<UserPlus className="size-4" />}  value={item.create_by ?? "—"} />
            </div>

            <div className="rounded-2xl border bg-card/60 p-4">
              <div className="text-sm font-semibold mb-2">Ghi chú</div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                {item.note ? String(item.note) : "—"}
              </div>
            </div>

          </div>
        </div>

        <DrawerFooter>
          <Button>Xem chi tiết</Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
