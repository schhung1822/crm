// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const academySchema = z.object({
  phone: z.string(),
  name: z.string(),
  email: z.string(),
  title_q1: z.string(),
  q1: z.string(),
  title_q2: z.string(),
  q2: z.string(),
  title_q3: z.string(),
  q3: z.string(),
  title_q4: z.string(),
  q4: z.string(),
  title_q5: z.string(),
  q5: z.string(),
  voucher: z.string(),
  event_name: z.string(),
  user_id: z.string(),
});

export type Academy = z.infer<typeof academySchema>;
