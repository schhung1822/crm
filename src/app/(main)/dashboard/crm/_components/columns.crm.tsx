import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { ChannelSummarySchema } from "./schema";

const fmtNumber = (n: number) => n.toLocaleString("vi-VN");

export const channelColumns: ColumnDef<z.infer<typeof ChannelSummarySchema>>[] = [
  {
    accessorKey: "kenh_ban",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kênh bán" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-primary/60" />
        <span className="font-semibold text-base">{row.original.kenh_ban}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "order_count",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số đơn" />,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="tabular-nums font-medium text-sm">{fmtNumber(row.original.order_count)}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sản phẩm bán ra" />,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="tabular-nums font-medium text-sm">{fmtNumber(row.original.quantity)}</span>
      </div>
    ),
  },
  {
    accessorKey: "tien_hang",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tiền hàng" />,
    cell: ({ row }) => (
      <div className="text-right">
        <span className="tabular-nums font-semibold text-sm">
          {fmtNumber(row.original.tien_hang)} ₫
        </span>
      </div>
    ),
  },
  {
    accessorKey: "giam_gia",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Giảm giá" />,
    cell: ({ row }) => (
      <div className="text-right">
        <span className="tabular-nums font-semibold text-sm">
          {fmtNumber(row.original.giam_gia)} ₫
        </span>
      </div>
    ),
  },
  {
    accessorKey: "thanh_tien",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thành tiền" />,
    cell: ({ row }) => (
      <div className="text-right">
        <span className="tabular-nums font-bold text-base">
          {fmtNumber(row.original.thanh_tien)} ₫
        </span>
      </div>
    ),
    enableHiding: false,
  },
];
