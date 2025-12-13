import { getDB } from "@/lib/db";
import { userSchema, Users } from "@/app/(main)/user/_components/schema";

export async function getUser(): Promise<Users[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(`
    SELECT
      id_user,
      email,
      username,
      password,
      name,
      classify,
      create_time
    FROM users 
  `);

  return rows.map((r) =>
    userSchema.parse({
      id_user: String(r.id_user),
      email: String(r.email ?? ""),
      username: String(r.username ?? ""),
      password: String(r.password ?? ""),
      name: String(r.name ?? ""),
      classify: String(r.classify ?? ""),
      create_time: new Date(r.create_time),
    }),
  );
}
