import { getDB } from "@/lib/db";
import { academySchema, Academy } from "@/app/(main)/academy/_components/schema";

export async function getAcademy(): Promise<Academy[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(`
    SELECT *
    FROM hoc_vien
  `);

  return rows.map((r) =>
    academySchema.parse({
      id_kenh: String(r.id_kenh),
      name: String(r.name ?? ""),
      class: r.class ? String(r.class) : "",
      phone: r.phone ? String(r.phone) : "",
      year: Number(r.year) || 0,
      city: r.city ? String(r.city) : "",
    }),
  );
}
