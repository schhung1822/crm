export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { DataTable } from "./_components/data-table";
import { getOrdersByCustomer } from "@/lib/ordersByCustomer";

export default async function Page({
  params,
}: {
  params: Promise<{ customerId: string }> | { customerId: string };
}) {
  // ✅ an toàn cho cả 2 trường hợp: params là object hoặc Promise
  const resolvedParams = await Promise.resolve(params);
  const rawCustomerId = resolvedParams?.customerId;

  const customerId = String(rawCustomerId ?? "").trim();

  if (!customerId) {
    return (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <h1 className="text-xl font-semibold">Thiếu customer ID</h1>
        <pre className="text-xs text-muted-foreground mt-2">
          {JSON.stringify({ rawCustomerId, customerId, resolvedParams }, null, 2)}
        </pre>
      </div>
    );
  }

  const { rows } = await getOrdersByCustomer(customerId);
  const customer = rows?.length ? rows[0] : null;

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <h1 className="text-xl font-semibold">Danh sách đơn hàng - {customerId}</h1>

      <div className="rounded-lg border bg-card/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">
              {customer?.name_customer ?? "Khách hàng không xác định"}
            </div>
            <div className="text-sm text-muted-foreground">Mã khách: {customerId}</div>
          </div>
          <div className="text-sm text-right">
            <div>SĐT: {customer?.phone ?? "—"}</div>
            <div>Địa chỉ: {customer?.address ?? "—"}</div>
          </div>
        </div>
      </div>

      <DataTable data={rows} />
    </div>
  );
}
