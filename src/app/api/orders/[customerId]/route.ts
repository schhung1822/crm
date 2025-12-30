import { NextResponse } from "next/server";
import { getOrdersByCustomer } from "@/lib/ordersByCustomer";

export async function GET(req: Request, { params }: { params: Promise<{ customerId: string }> }) {
  try {
    const { customerId } = await params;
    const customIdStr = String(customerId || "").trim();
    if (!customIdStr) return NextResponse.json({ rows: [], total: 0 });

    const { rows, total } = await getOrdersByCustomer(customIdStr, { pageSize: "all" });
    return NextResponse.json({ rows, total });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
