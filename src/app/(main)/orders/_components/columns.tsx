import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { channelSchema, Channel } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

// ---- Stats type ----
export type Stats = {
  totalOrders: number;
  totalTienHang: number;
  totalThanhTien: number;
  totalQuantity: number;
};

// ---- Columns factory (nhận stats) ----
export const dashboardColumns = (stats: Stats): ColumnDef<Channel>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Mã đơn (đặt lên cột đầu)
  {
    accessorKey: "order_ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã đơn" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} stats={stats} />,
    enableSorting: false,
  },

  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thương hiệu" />
    ),
    cell: ({ row }) => <span>{row.original.brand}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "name_customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách hàng" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.name_customer}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Điện thoại" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.phone}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ" />
    ),
    cell: ({ row }) => <span className="max-w-[200px] truncate block">{row.original.address}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "seller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Người bán" />
    ),
    cell: ({ row }) => <span>{row.original.seller}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "kenh_ban",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kênh bán" />
    ),
    cell: ({ row }) => <span>{row.original.kenh_ban}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-full text-right" column={column} title="Số lượng" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.original.quantity}</div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "giam_gia",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-full text-right" column={column} title="Giảm giá" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.giam_gia || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "tien_hang",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-full text-right" column={column} title="Tiền hàng" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.tien_hang || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "thanh_tien",
    header: ({ column }) => (
      <DataTableColumnHeader className="w-full text-right" column={column} title="Thành tiền" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.thanh_tien || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const s = String(row.original.status ?? "").toLowerCase();
      let className = "bg-muted/20 text-muted-foreground";
      if (s.includes("Hoành thành")) className = "bg-emerald-600 text-white";
      else if (s.includes("Đang xử lý") || s.includes("Đã xác nhận")) className = "bg-amber-400 text-black";
      else if (s.includes("Không giao được") || s.includes("Đã hủy")) className = "bg-red-600 text-white";
      else if (s.includes("Phiếu tạm")) className = "bg-sky-600 text-white";

      return (
        <Badge className={className}>
          {row.original.status}
        </Badge>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "create_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.create_time instanceof Date
          ? row.original.create_time.toLocaleDateString("vi-VN")
          : row.original.create_time}
      </span>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    cell: ({ row }) => <span className="max-w-[200px] truncate block">{row.original.note}</span>,
    enableSorting: false,
  },

  // Actions
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          <DropdownMenuItem>Tạo bản sao</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
