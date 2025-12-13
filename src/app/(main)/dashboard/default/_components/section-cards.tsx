import { TrendingUp, TrendingDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SectionCardsProps = {
  stats: {
    totalChannels: number;
    totalFollowers: number;
    totalVideos: number;
    totalLikes: number;
  };
};

export function SectionCards({ stats }: SectionCardsProps) {
  const formatNumber = (n: number) =>
    n.toLocaleString("vi-VN"); // 1 234 567

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Tổng số kênh */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng số kênh</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats.totalChannels)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              Channels
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tổng số kênh đang theo dõi
          </div>
        </CardFooter>
      </Card>

      {/* Tổng follower */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng follower</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats.totalFollowers)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              Theo dõi
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tổng follower của tất cả kênh
          </div>
        </CardFooter>
      </Card>

      {/* Tổng số video */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng số video</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats.totalVideos)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              Nội dung
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tổng video đã đăng trên các kênh
          </div>
        </CardFooter>
      </Card>

      {/* Tổng lượt thích */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tổng lượt thích</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatNumber(stats.totalLikes)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              Like
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tổng like trên toàn bộ kênh
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
