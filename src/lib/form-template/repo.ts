import { prisma } from "@/lib/prisma"; // bạn đã có prisma client
import { defaultConfig } from "./defaultConfig";
import { FormTemplateConfig } from "./types";

export async function getTemplateBySlug(slug: string) {
  const row = await prisma.formTemplate.findUnique({ where: { slug } });
  if (!row) return null;
  return {
    id: row.id_temp,
    slug: row.slug,
    name: row.name,
    isActive: row.isActive === "1" || row.isActive === "true",
    config: JSON.parse(row.configJson) as FormTemplateConfig,
  };
}

export async function upsertTemplate(slug: string, name: string, config: FormTemplateConfig) {
  const configJson = JSON.stringify(config);
  return prisma.formTemplate.upsert({
    where: { slug },
    update: { name, configJson, isActive: "1" },
    create: { slug, name, configJson, isActive: "1" },
  });
}

export async function ensureDefaultTemplate() {
  const slug = "eac-checkin";
  const exists = await prisma.formTemplate.findUnique({ where: { slug } });
  if (exists) return;
  await prisma.formTemplate.create({
    data: { slug, name: "EAC Check-in", configJson: JSON.stringify(defaultConfig), isActive: "1" },
  });
}
