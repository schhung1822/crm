// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const academySchema = z.object({
  phone: z.string(),
  name: z.string(),
  city: z.string(),
  role: z.string(),
  co_so: z.string(),
  name_nv: z.string(),
  voucher: z.string(),
  user_id: z.string(),
});

export type Academy = z.infer<typeof academySchema>;
