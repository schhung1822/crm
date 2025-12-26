import { getDB } from "@/lib/db";
import { academySchema, Academy } from "@/app/(main)/events/_components/schema";

export async function getAcademy(): Promise<Academy[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(`
    SELECT phone, name, city, role, co_so, name_nv, voucher, user_id
    FROM register
  `);

  return rows.map((r) =>
    academySchema.parse({
      phone: String(r.phone),
      name: String(r.name ?? ""),
      city: r.city ? String(r.city) : "",
      role: r.role ? String(r.role) : "",
      co_so: r.co_so ? String(r.co_so) : "",
      name_nv: r.name_nv ? String(r.name_nv) : "",
      voucher: r.voucher ? String(r.voucher) : "",
      user_id: r.user_id ? String(r.user_id) : "",
    }),
  );
}
