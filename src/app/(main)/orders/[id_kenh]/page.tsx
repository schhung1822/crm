export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { DataTable } from "./_components/data-table";
import { getOrdersByCustomer } from "@/lib/ordersByCustomer";

const norm = (s?: string) => (s ?? "").replace(/^@/, "").trim();

export default async function Page({params,}: {params: Promise<{ id_kenh: string }>;}) {
  const { id_kenh } = await params;
  const customerId = String(id_kenh || "").trim();

  if (!customerId) {
    return (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <h1 className="text-xl font-semibold">Thiếu customer ID</h1>
        <pre className="text-xs text-muted-foreground mt-2">
          {JSON.stringify({ customerId }, null, 2)}
        </pre>
      </div>
    );
  }

  const { rows } = await getOrdersByCustomer(customerId);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <h1 className="text-xl font-semibold">Danh sách đơn hàng - {customerId}</h1>
      <DataTable data={rows} />
    </div>
  );
}
