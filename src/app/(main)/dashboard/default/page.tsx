import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import { DateRangeFilter } from "./_components/date-range-filter";
import { getChannels } from "@/lib/orders";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const from = params.from ? new Date(params.from) : undefined;
  const to = params.to ? new Date(params.to) : undefined;

  // Ensure toDate is end of day
  if (to) {
    to.setHours(23, 59, 59, 999);
  }

  let channels: any[] = [];
  try {
    const res = await getChannels({ from, to, limit: 10000 });
    channels = Array.isArray(res) ? res : [];
  } catch (e) {
    console.error("getChannels error:", e);
    channels = [];
  }

  const stats = {
    totalOrders: channels.length,
    totalQuantity: channels.reduce((s, c) => s + (Number(c.quantity) || 0), 0),
    totalThanhTien: channels.reduce((s, c) => s + (Number(c.thanh_tien) || 0), 0),
    totalTienHang: channels.reduce((s, c) => s + (Number(c.tien_hang) || 0), 0),
  };

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
      <DataTable data={channels} stats={stats} />
    </div>
  );
}
