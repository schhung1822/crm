import {
  getRevenueByChannelChart,
  getRevenueByBranchBarChart,
  getCRMStats,
  getBrandConversionFunnel,
  getChannelSalesSummary,
  getTopProductsByQuantity,
  getTopSalesByRevenue,
} from "@/lib/crm-revenue";

import { DateRangeFilter } from "./_components/date-range-filter";
import { InsightCards } from "./_components/insight-cards";
import { OperationalCards } from "./_components/operational-cards";
import { OverviewCards } from "./_components/overview-cards";
import { SectionCards } from "./_components/section-cards";
import { TableCards } from "./_components/table-cards";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams;
  const from = params.from ? new Date(params.from) : undefined;
  const to = params.to ? new Date(params.to) : undefined;

  // Ensure toDate is end of day
  if (to) {
    to.setHours(23, 59, 59, 999);
  }

  const [revenueByChannel, revenueByBranchBars, stats, brandFunnel, topProducts, topSales, channelSummary] =
    await Promise.all([
      getRevenueByChannelChart(from, to),
      getRevenueByBranchBarChart(from, to, 12),
      getCRMStats(from, to),
      getBrandConversionFunnel(from, to),
      getTopProductsByQuantity(from, to, 10),
      getTopSalesByRevenue(from, to, 5),
      getChannelSalesSummary(from, to),
    ]);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <DateRangeFilter />
      <SectionCards stats={stats} />
      <OverviewCards />
      <InsightCards revenueByChannel={revenueByChannel} revenueByBranchBars={revenueByBranchBars} />
      <OperationalCards brandFunnel={brandFunnel} topProducts={topProducts} topSales={topSales} />
      <TableCards channels={channelSummary} />
    </div>
  );
}
