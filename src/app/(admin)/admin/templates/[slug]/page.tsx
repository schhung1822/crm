import { ensureDefaultTemplate, getActiveTemplate, getTemplateBySlug } from "@/lib/form-template/repo";

import AdminTemplateEditor from "./ui";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureDefaultTemplate();
  const tpl = slug === "edit" ? await getActiveTemplate() : await getTemplateBySlug(slug);

  if (!tpl) {
    return (
      <div className="not-found-screen">
        <div className="logo" aria-label="EAC">
          <span>E</span>
          <span>A</span>
          <span>C</span>
        </div>
        <div className="text-center text-black dark:text-white">Trang này đã bị xóa hoặc tạm thời không khả dụng</div>
        <style>{`
          .not-found-screen {
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #0f172a;
            font-family: "Poppins", sans-serif;
          }

          .logo {
            display: flex;
            gap: 12px;
            font-size: 96px;
            font-weight: 800;
            color: #38bdf8;
          }

          .logo span {
            opacity: 0;
            transform: translateY(30px);
            animation: showUp 0.8s ease forwards;
            text-shadow: 0 0 0 transparent;
          }

          .logo span:nth-child(1) {
            animation-delay: 0s;
          }
          .logo span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .logo span:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes showUp {
            to {
              opacity: 1;
              transform: translateY(0);
              text-shadow: 0 0 20px rgba(56, 189, 248, 0.8);
            }
          }
        `}</style>
      </div>
    );
  }

  return <AdminTemplateEditor slug={tpl.slug} initialName={tpl.name} initialConfig={tpl.config} />;
}
