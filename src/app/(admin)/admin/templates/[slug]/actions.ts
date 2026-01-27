"use server";

import { updateTemplateBySlug } from "@/lib/form-template/repo";
import type { FormTemplateConfig } from "@/lib/form-template/types";

export async function saveTemplateAction(
  slug: string,
  nextSlug: string,
  name: string,
  config: FormTemplateConfig
) {
  // TODO: nếu CRM bạn có auth, check role admin ở đây
  await updateTemplateBySlug(slug, nextSlug, name, config);
  return { ok: true };
}
