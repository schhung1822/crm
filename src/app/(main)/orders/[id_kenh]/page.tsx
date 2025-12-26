// app/(main)/kenh/[id_kenh]/video/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { DataTable } from "./_components/data-table";
import { getVideosByChannel } from "@/lib/videos_by_kenh";

const norm = (s?: string) => (s ?? "").replace(/^@/, "").trim();

export default async function Page({params,}: {params: Promise<{ id_kenh: string }>;}) {
  const { id_kenh } = await params;
  const idKenh = norm(id_kenh);

  if (!idKenh) {
    return (
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <h1 className="text-xl font-semibold">Thiếu id_kenh</h1>
        <pre className="text-xs text-muted-foreground mt-2">
          {JSON.stringify({ id_kenh }, null, 2)}
        </pre>
      </div>
    );
  }

  const { rows } = await getVideosByChannel(idKenh);

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <h1 className="text-xl font-semibold">Danh sách video của @{idKenh}</h1>
      <DataTable data={rows} />
    </div>
  );
}
