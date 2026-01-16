import { ensureDefaultTemplate, getTemplateBySlug } from "@/lib/form-template/repo";
import AdminTemplateEditor from "./ui";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureDefaultTemplate();
  const tpl = await getTemplateBySlug(slug);

  if (!tpl || !tpl.slug || !tpl.name || !tpl.config) {
    return <div className="p-6">Không tìm thấy template</div>;
  }
  
  return <AdminTemplateEditor slug={tpl.slug} initialName={tpl.name} initialConfig={tpl.config} />;
}
