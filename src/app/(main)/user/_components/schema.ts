// src/app/(main)/dashboard/default/_components/schema.ts
import { z } from "zod";

export const userSchema = z.object({
  id_user: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  name: z.string(),
  classify: z.string(),
  create_time: z.date(),
});

export type Users = z.infer<typeof userSchema>;
