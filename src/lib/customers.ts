import { getDB } from "@/lib/db";
import { userSchema, Users } from "@/app/(main)/customers/_components/schema";

export async function getUser(): Promise<Users[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(`
    SELECT
      customer_ID,
      name,
      phone,
      class,
      gender,
      birth,
      company,
      address,
      create_by,
      create_time,
      last_payment,
      note,
      branch,
      no_hien_tai,
      tong_ban,
      tong_ban_tru_tra_hang
    FROM customer 
  `);

  return rows.map((r) =>
    userSchema.parse({
      customer_ID: String(r.customer_ID),
      name: String(r.name ?? ""),
      phone: String(r.phone ?? ""),
      class: String(r.class ?? ""),
      gender: String(r.gender ?? ""),
      birth: r.birth ? new Date(r.birth) : null,
      create_time: new Date(r.create_time),
      last_payment: new Date(r.last_payment),
      company: String(r.company ?? ""),
      address: String(r.address ?? ""),
      create_by: String(r.create_by ?? ""),
      note: String(r.note ?? ""),
      branch: String(r.branch ?? ""),
      no_hien_tai: String(r.no_hien_tai ?? ""),
      tong_ban: String(r.tong_ban ?? ""),
      tong_ban_tru_tra_hang: String(r.tong_ban_tru_tra_hang ?? ""),
    }),
  );
}