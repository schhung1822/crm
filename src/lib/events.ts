import type { RowDataPacket } from "mysql2";

import { academySchema, Academy } from "@/app/(main)/events/_components/schema";
import { getDB } from "@/lib/db";

type AcademyRow = RowDataPacket & {
  phone: string | null;
  name: string | null;
  email: string | null;
  title_q1: string | null;
  q1: string | null;
  title_q2: string | null;
  q2: string | null;
  title_q3: string | null;
  q3: string | null;
  title_q4: string | null;
  q4: string | null;
  title_q5: string | null;
  q5: string | null;
  voucher: string | null;
  event_name: string | null;
  user_id: string | null;
  oa_interest: string | null;
};

export async function getAcademy(): Promise<Academy[]> {
  const db = getDB();

  const [rows] = await db.query<AcademyRow[]>(`
    SELECT
      c.phone,
      c.name,
      c.email,
      c.title_q1,
      c.q1,
      c.title_q2,
      c.q2,
      c.title_q3,
      c.q3,
      c.title_q4,
      c.q4,
      c.title_q5,
      c.q5,
      c.voucher,
      c.event_name,
      c.user_id,
      CASE
        WHEN oa.user_id IS NULL THEN 'Chưa quan tâm'
        ELSE 'Quan tâm'
      END AS oa_interest
    FROM checkin c
    LEFT JOIN user_zaloOA oa ON oa.user_id = c.user_id
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
      user_id: r.user_id ? String(r.user_id) : "",
      oa_interest: r.oa_interest ? String(r.oa_interest) : "Chưa quan tâm",
    }),
  );
}
