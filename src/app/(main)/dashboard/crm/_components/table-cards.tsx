"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { channelColumns } from "./columns.crm";
import { ChannelSummary } from "./schema";

type Props = {
  channels: ChannelSummary[];
};

export function TableCards({ channels }: Props) {
  const formatVND = (n: number) => n.toLocaleString("vi-VN");
  const total = channels.reduce(
    (acc, cur) => {
      acc.order_count += cur.order_count;
      acc.quantity += cur.quantity;
      acc.tien_hang += cur.tien_hang;
      acc.giam_gia += cur.giam_gia;
      acc.thanh_tien += cur.thanh_tien;
      return acc;
    },
    { order_count: 0, quantity: 0, tien_hang: 0, giam_gia: 0, thanh_tien: 0 },
  );

  const table = useDataTableInstance({
    data: channels,
    columns: channelColumns,
    getRowId: (row) => row.kenh_ban,
  });

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-lg">Thống kê bán hàng theo các kênh</CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="">
        <div className="bg-muted/20 mb-6 grid grid-cols-2 gap-4 rounded-lg border p-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">Tổng đơn</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.order_count)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">Sản phẩm</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.quantity)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">Tiền hàng</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.tien_hang)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">Giảm giá</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.giam_gia)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground text-xs font-medium">Thành tiền</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.thanh_tien)}</div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg ">
          <DataTable table={table} columns={channelColumns} />
        </div>
      </CardContent>
    </Card>
  );
}
