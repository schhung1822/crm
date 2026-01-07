"use client";

import { Download } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
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
    { order_count: 0, quantity: 0, tien_hang: 0, giam_gia: 0, thanh_tien: 0 }
  );

  const table = useDataTableInstance({
    data: channels,
    columns: channelColumns,
    getRowId: (row) => row.kenh_ban,
  });

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle className="text-lg">Thống kê bán hàng theo các kênh</CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              <span className="hidden lg:inline">Xuất</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 p-4 rounded-lg border bg-muted/20">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Tổng đơn</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.order_count)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Sản phẩm</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.quantity)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Tiền hàng</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.tien_hang)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Giảm giá</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.giam_gia)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Thành tiền</div>
            <div className="text-2xl font-bold tabular-nums">{formatVND(total.thanh_tien)}</div>
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <DataTable table={table} columns={channelColumns} />
        </div>
      </CardContent>
    </Card>
  );
}
