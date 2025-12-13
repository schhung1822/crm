import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";

type SectionCardsProps = {
  stats: {
    totalChannels: number;
    totalFollowers: number;
    totalVideos: number;
    totalLikes: number;
    first_follower?: number;
    first_video?: number;
    first_like?: number;
  };
};

export function SectionCardsView({ stats }: SectionCardsProps) {
  const fmt = (n: number) => n.toLocaleString("vi-VN");

  const calc = (current: number, first?: number) => {
    const base = typeof first === "number" ? first : 0;
    const delta = current - base;
    const pct = base > 0 ? (delta / base) * 100 : null;
    const up = delta >= 0;
    return { delta, pct, up };
  };

  const F = calc(stats.totalFollowers, stats.first_follower);
  const V = calc(stats.totalVideos, stats.first_video);
  const L = calc(stats.totalLikes, stats.first_like);

  const DeltaBadge = ({ up, pct }: { up: boolean; pct: number | null }) => (
    <Badge variant="outline" className={up ? "border-emerald-500/50" : "border-rose-500/50"}>
      {up ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
      {pct === null ? "—" : `${up ? "+" : "−"}${Math.abs(pct).toLocaleString("vi-VN", { maximumFractionDigits: 1 })}%`}
    </Badge>
  );

  // ⬇️ Nhãn nhỏ hiển thị ngay cạnh số hiện tại (thay đổi tuyệt đối)
  const DeltaTiny = ({ delta }: { delta: number }) => (
    <span className="ml-2 whitespace-nowrap text-xs text-muted-foreground">
      {delta === 0 ? "±0" : `${delta > 0 ? "+" : "−"}${fmt(Math.abs(delta))}`}
    </span>
  );

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Followers */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng Followers</CardDescription>
          <div className="flex items-baseline">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {fmt(stats.totalFollowers)}
            </CardTitle>
            <DeltaTiny delta={F.delta} />
          </div>
          <CardAction>
            <DeltaBadge up={F.up} pct={F.pct} />
          </CardAction>
        </CardHeader>
      </Card>

      {/* Videos */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng số video</CardDescription>
          <div className="flex items-baseline">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {fmt(stats.totalVideos)}
            </CardTitle>
            <DeltaTiny delta={V.delta} />
          </div>
          <CardAction>
            <DeltaBadge up={V.up} pct={V.pct} />
          </CardAction>
        </CardHeader>
      </Card>

      {/* Likes — full width hàng dưới */}
      <Card className="@container/card col-span-1 @xl/main:col-span-2 @5xl/main:col-span-4">
        <CardHeader>
          <CardDescription>Tổng lượt thích</CardDescription>
          <div className="flex items-baseline">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {fmt(stats.totalLikes)}
            </CardTitle>
            <DeltaTiny delta={L.delta} />
          </div>
          <CardAction>
            <DeltaBadge up={L.up} pct={L.pct} />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
