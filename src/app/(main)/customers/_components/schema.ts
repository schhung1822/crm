// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const userSchema = z.object({
  customer_ID: z.string(),
  name: z.string(),
  phone: z.string(),
  class: z.string(),
  gender: z.string(),
  birth: z.date().nullable().optional(),
  create_time: z.date(),
  last_payment: z.date(),
  company: z.string(),
  address: z.string(),
  create_by: z.string(),
  note: z.string(),
  branch: z.string(),
  no_hien_tai: z.string(),
  tong_ban: z.string(),
  tong_ban_tru_tra_hang: z.string(),
});

export type Users = z.infer<typeof userSchema>;
