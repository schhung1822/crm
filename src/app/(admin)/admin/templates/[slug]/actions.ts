"use server";

import { upsertTemplate } from "@/lib/form-template/repo";
import type { FormTemplateConfig } from "@/lib/form-template/types";

export async function saveTemplateAction(slug: string, name: string, config: FormTemplateConfig) {
  // TODO: nếu CRM bạn có auth, check role admin ở đây
  await upsertTemplate(slug, name, config);
  return { ok: true };
}
