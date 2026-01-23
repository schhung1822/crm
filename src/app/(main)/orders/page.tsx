// app/(main)/kenh/page.tsx
export const runtime = "nodejs";

import { getChannels } from "@/lib/orders";

import { DataTable } from "./_components/data-table";

export default async function Page() {
  let channels: any[] = [];
  try {
    const res = await getChannels();
    channels = Array.isArray(res) ? res : [];
  } catch (e) {
    console.error("getChannels error:", e);
    channels = [];
  }

  const stats = {
    totalOrders: channels.length,
    totalTienHang: channels.reduce((s, c) => s + (Number(c.tien_hang) || 0), 0),
    totalThanhTien: channels.reduce((s, c) => s + (Number(c.thanh_tien) || 0), 0),
    totalQuantity: channels.reduce((s, c) => s + (Number(c.quantity) || 0), 0),
  };

  return <DataTable data={channels} />;
}
