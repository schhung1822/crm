"use client";

import { TrendingUp } from "lucide-react";
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

import { academySchema } from "./schema";

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

export function TableCellViewer({ item }: { item: z.infer<typeof academySchema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        {/* Ô trong bảng sẽ hiển thị tên kênh */}
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          {/* có thể dùng id_kenh như username */}
          <DrawerDescription>
            @{item.id_kenh} • Username: {item.id_kenh}
          </DrawerDescription>
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
                  Họ tên: {item.name} • Năm sinh:{" "}{item.year}
                </div>
                <div className="text-muted-foreground">
                  Điện thoại: {item.phone}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Form xem / chỉnh thông tin kênh */}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Username</Label>
              <Input id="name" defaultValue={item.id_kenh} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="id_kenh">Họ tên</Label>
              <Input id="id_kenh" defaultValue={item.name} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone">Điện thoại</Label>
                <Input id="phone" defaultValue={item.phone} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="year">Năm</Label>
                <Input id="year" defaultValue={item.year} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="city">Tỉnh/Thành phố</Label>
              <Input id="city" defaultValue={item.city} />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="id_kenh">Link kênh</Label>
              <a href={`https://tiktok.com/video/@${item.id_kenh}`}>{`https://tiktok.com/video/@${item.id_kenh}`}</a>
            </div>
          </form>
        </div>

        <DrawerFooter>
          <Button>Thoát</Button>
          <DrawerClose asChild>
            <Button variant="outline">Xem chi tiết kênh</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
