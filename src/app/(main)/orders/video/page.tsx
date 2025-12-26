import { DataTable } from "./_components/data-table";
import { getVideos } from "@/lib/videos";

export default async function Page() {
  const video = await getVideos();

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <DataTable data={video} />
    </div>
  );
}
