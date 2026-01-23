import { getChannelSalesSummary, getCRMStats } from "@/lib/crm-revenue";
import { getChannels } from "@/lib/orders";

import { TableCards } from "../crm/_components/table-cards";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DateRangeFilter } from "./_components/date-range-filter";
import { SectionCards } from "./_components/section-cards";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const from = params.from ? new Date(params.from) : undefined;
  const to = params.to ? new Date(params.to) : undefined;

  // Ensure toDate is end of day
  if (to) {
    to.setHours(23, 59, 59, 999);
  }

  let channels: any[] = [];
  let channelSummary: any[] = [];
  let stats: any = {};
  try {
    const res = await getChannels({ from, to, limit: 10000 });
    channels = Array.isArray(res) ? res : [];
    [channelSummary, stats] = await Promise.all([getChannelSalesSummary(from, to), getCRMStats(from, to)]);
  } catch (e) {
    console.error("getChannels error:", e);
    channels = [];
    channelSummary = [];
    stats = {
      totalOrders: 0,
      totalQuantity: 0,
      totalThanhTien: 0,
      totalTienHang: 0,
    };
  }

  // Build chart data (group by date)
  const chartMap: Record<string, { orders: number; revenue: number }> = {};
  for (const c of channels) {
    const d = c.create_time instanceof Date ? c.create_time : new Date(c.create_time);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    chartMap[key] ??= { orders: 0, revenue: 0 };
    chartMap[key].orders += 1;
    chartMap[key].revenue += Number(c.thanh_tien) || 0;
  }

  const chartData = Object.keys(chartMap)
    .sort()
    .map((date) => ({ date, orders: chartMap[date].orders, revenue: chartMap[date].revenue }));

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DateRangeFilter />
      <SectionCards stats={stats} />
      <ChartAreaInteractive chartData={chartData} />
      <TableCards channels={channelSummary} />
    </div>
  );
}
