import { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";

import { ChannelSummarySchema } from "./schema";

const fmtNumber = (n: number) => n.toLocaleString("vi-VN");

export const channelColumns: ColumnDef<z.infer<typeof ChannelSummarySchema>>[] = [
  {
    id: "drag",
    header: () => <div className="w-7" />,
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground size-7 hover:bg-transparent cursor-grab"
      >
        <GripVertical className="text-muted-foreground size-4" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "kenh_ban",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kênh bán" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold">{row.original.kenh_ban}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "order_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số đơn" />,
    cell: ({ row }) => (
      <div className="text-left">
        <span className="text-sm font-medium tabular-nums">{fmtNumber(row.original.order_count)}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sản phẩm bán ra" />,
    cell: ({ row }) => (
      <div className="text-left">
        <span className="text-sm font-medium tabular-nums">{fmtNumber(row.original.quantity)}</span>
      </div>
    ),
  },
  {
    accessorKey: "tien_hang",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tiền hàng" />,
    cell: ({ row }) => (
      <div className="text-left">
        <span className="text-sm font-semibold tabular-nums">{fmtNumber(row.original.tien_hang)} ₫</span>
      </div>
    ),
  },
  {
    accessorKey: "giam_gia",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giảm giá" />,
    cell: ({ row }) => (
      <div className="text-left">
        <span className="text-sm font-semibold tabular-nums">{fmtNumber(row.original.giam_gia)} ₫</span>
      </div>
    ),
  },
  {
    accessorKey: "thanh_tien",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thành tiền" />,
    cell: ({ row }) => (
      <div className="text-left">
        <span className="text-base font-bold tabular-nums">{fmtNumber(row.original.thanh_tien)} ₫</span>
      </div>
    ),
    enableHiding: false,
  },
];
