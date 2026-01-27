/* eslint-disable prettier/prettier */
"use client";

import { Heart, Users } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type RatioItem = { name: string; value: number; fill: string };

type EventsSummaryProps = {
  totalCheckins: number;
  totalOaInterested: number;
  nghềData: RatioItem[];
  eventRatioData: RatioItem[];
};

function RatioLegend({ items }: { items: RatioItem[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ background: item.fill }} />
          <span className="text-muted-foreground text-xs">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

function formatTooltip(value: ValueType, _name: NameType, item: { payload?: { name?: string } }) {
  const label = item.payload?.name ?? "";
  const displayValue = Array.isArray(value) ? value.join(", ") : String(value);
  return `${displayValue} ${label}`.trim();
}

export function EventsSummary({ totalCheckins, totalOaInterested, nghềData, eventRatioData }: EventsSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Lượt checkin</CardTitle>
            <Users className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tabular-nums">{totalCheckins}</div>
            <p className="text-muted-foreground text-xs">Tổng lượt trong bảng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Quan tâm OA</CardTitle>
            <Heart className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold tabular-nums">{totalOaInterested}</div>
            <p className="text-muted-foreground text-xs">Số lượt quan tâm OA</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tỷ lệ theo ngành nghề</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Tỷ lệ" } }} className="h-[220px] w-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={formatTooltip} />} />
              <Pie data={nghềData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {nghềData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <RatioLegend items={nghềData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Tỷ lệ theo sự kiện</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Tỷ lệ" } }} className="h-[220px] w-full">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={formatTooltip} />} />
              <Pie data={eventRatioData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {eventRatioData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <RatioLegend items={eventRatioData} />
        </CardContent>
      </Card>
    </div>
  );
}
