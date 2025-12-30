import { NextResponse } from "next/server";
import { getOrdersByCustomer } from "@/lib/ordersByCustomer";

export async function GET(req: Request, { params }: { params: { customerId: string } }) {
  try {
    const customerId = String(params.customerId || "").trim();
    if (!customerId) return NextResponse.json({ rows: [], total: 0 });

    const { rows, total } = await getOrdersByCustomer(customerId, { pageSize: "all" });
    return NextResponse.json({ rows, total });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
