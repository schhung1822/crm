"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

type ChartPoint = { date: string; orders: number; revenue: number };

const TEMPLATES = {
  default: { orders: "#60a5fa", revenue: "#22c55e" },
  midnight: { orders: "#38bdf8", revenue: "#a78bfa" },
  sunset: { orders: "#fb7185", revenue: "#f59e0b" },
} as const;

export function formatVNDShort(value: number) {
  if (value >= 1_000_000_000) return `${Math.round(value / 1_000_000_000)}tỷ`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}tr`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return value.toString();
}

export function ChartAreaInteractive({
  chartData,
  templateKey = "default",
}: {
  chartData?: ChartPoint[];
  templateKey?: keyof typeof TEMPLATES;
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const tpl = TEMPLATES[templateKey] ?? TEMPLATES.default;

  // ✅ QUAN TRỌNG: color phải là màu thật, KHÔNG phải var(...)
  const chartConfig = React.useMemo(
    () =>
      ({
        orders: { label: "Đơn hàng", color: tpl.orders },
        revenue: { label: "Doanh thu", color: tpl.revenue },
      }) satisfies ChartConfig,
    [tpl.orders, tpl.revenue]
  );

  const staticChartData: ChartPoint[] = [{ date: new Date().toISOString(), orders: 0, revenue: 0 }];
  const source = chartData ?? staticChartData;

  const filteredData = source.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  // tránh trùng id nếu render nhiều chart
  const gradOrdersId = `fillOrders-${templateKey}`;
  const gradRevenueId = `fillRevenue-${templateKey}`;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Đơn hàng - doanh thu</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">Tổng kết 3 tháng qua</span>
          <span className="@[540px]/card:hidden">3 Tháng qua</span>
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 tháng qua</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 ngày qua</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 ngày qua</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="flex w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 tháng qua
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 ngày qua
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 ngày qua
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* ✅ ChartContainer sẽ set: --color-orders, --color-revenue */}
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradOrdersId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
              </linearGradient>

              <linearGradient id={gradRevenueId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("vi-VN", { month: "2-digit", day: "2-digit" })
              }
            />

            <YAxis yAxisId="left" tickLine={false} axisLine={false} width={40} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={40} tickFormatter={formatVNDShort}/>

            <Legend wrapperStyle={{ paddingTop: "20px" }} />

            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("vi-VN", {
                      weekday: "short",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              yAxisId="left"
              dataKey="orders"
              type="natural"
              fill={`url(#${gradOrdersId})`}
              stroke="var(--color-orders)"
              name="Đơn hàng"
            />

            <Area
              yAxisId="right"
              dataKey="revenue"
              type="natural"
              fill={`url(#${gradRevenueId})`}
              stroke="var(--color-revenue)"
              name="Doanh thu"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
