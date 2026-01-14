import { getDB } from "@/lib/db";
import { academySchema, Academy } from "@/app/(main)/events/_components/schema";

export async function getAcademy(): Promise<Academy[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(`
    SELECT phone, name, email, title_q1, q1, title_q2, q2, title_q3, q3, title_q4, q4, title_q5, q5, voucher, event_name, user_id
    FROM checkin
  `);

  return rows.map((r) =>
    academySchema.parse({
      phone: String(r.phone),
      name: String(r.name ?? ""),
      email: String(r.email ?? ""),
      title_q1: r.title_q1 ? String(r.title_q1) : "",
      q1: r.q1 ? String(r.q1) : "",
      title_q2: r.title_q2 ? String(r.title_q2) : "",
      q2: r.q2 ? String(r.q2) : "",
      title_q3: r.title_q3 ? String(r.title_q3) : "",
      q3: r.q3 ? String(r.q3) : "",
      title_q4: r.title_q4 ? String(r.title_q4) : "",
      q4: r.q4 ? String(r.q4) : "",
      title_q5: r.title_q5 ? String(r.title_q5) : "",
      q5: r.q5 ? String(r.q5) : "",
      event_name: r.event_name ? String(r.event_name) : "",
      voucher: r.voucher ? String(r.voucher) : "",
      user_id: r.user_id ? String(r.user_id) : ""
    }),
  );
}
