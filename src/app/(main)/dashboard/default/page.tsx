import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import { getChannels } from "@/lib/channels";

export default async function Page() {
  let channels: any[] = [];
  try {
    const res = await getChannels();
    channels = Array.isArray(res) ? res : [];
  } catch (e) {
    console.error("getChannels error:", e);
    channels = [];
  }

  const stats = {
    totalChannels: channels.length,
    totalFollowers: channels.reduce((s, c) => s + (c.follower ?? 0), 0),
    totalVideos: channels.reduce((s, c) => s + (c.video_quantiy ?? 0), 0),
    totalLikes: channels.reduce((s, c) => s + (c.like ?? 0), 0),
    first_follower: channels[0]?.first_follower ?? 0,
    first_video: channels[0]?.first_video ?? 0,
    first_like: channels[0]?.first_like ?? 0,
  };

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards stats={stats} />
      <ChartAreaInteractive />
      <DataTable data={channels} stats={stats}  />
    </div>
  );
}
