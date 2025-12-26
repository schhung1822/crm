import { getDB } from "@/lib/db";
import { productSchema, Product } from "@/app/(main)/products/_components/schema";

export async function getProducts(): Promise<Product[]> {
  const db = getDB();

  const [rows] = await db.query<any[]>(
    `
    SELECT 
      pro_ID, name, brand, class, gia_ban, gia_von, property
    FROM product
    `
  );

  return (rows ?? []).map((r) =>
    productSchema.parse({
      pro_ID: String(r.pro_ID),
      name: String(r.name ?? ""),
      brand: String(r.brand ?? ""),
      class: String(r.class ?? ""),
      gia_ban: Number(r.gia_ban) || 0,
      gia_von: Number(r.gia_von) || 0,
      property: r.property ? String(r.property) : "",
    })
  );
}