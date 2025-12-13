"use client";

import { BadgeCheck, TrendingUp } from "lucide-react";
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

import { userSchema } from "./schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

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

export function TableCellViewer({ item }: { item: z.infer<typeof userSchema> }) {
  const isMobile = useIsMobile();

  const createdAt =
    item.create_time instanceof Date
      ? item.create_time.toLocaleDateString("vi-VN")
      : item.create_time;

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {/* Ô trong bảng sẽ hiển thị tên kênh */}
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
                  src={"@/public/avatars/nghecontent" || undefined}
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
              <DrawerDescription className="truncate">
                @{item.id_user}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                   <DrawerDescription>Ngày tạo: {createdAt}</DrawerDescription>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Form xem / chỉnh thông tin kênh */}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input id="name" defaultValue={item.name} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="id_user">Username</Label>
              <Input id="id_user" defaultValue={item.username} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={item.email} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="classify">Vai trò</Label>
              <Select defaultValue={item.classify ?? "viewer"}>
                <SelectTrigger id="classify" className="w-full">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Dev</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>

        <DrawerFooter>
          <Button>Lưu</Button>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
