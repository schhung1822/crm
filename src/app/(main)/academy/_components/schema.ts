// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const academySchema = z.object({
  id_kenh: z.string(),
  name: z.string(),
  class: z.string(),
  phone: z.string(),
  year: z.number(),
  city: z.string()
});

export type Academy = z.infer<typeof academySchema>;
