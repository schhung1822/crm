import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Mã đơn (đặt lên cột đầu)
  {
    accessorKey: "order_ID",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã đơn" />,
    cell: ({ row }) => <TableCellViewer item={row.original} stats={stats} />,
    enableSorting: false,
    size: 120,
  },

  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thương hiệu" />,
    cell: ({ row }) => <span>{row.original.brand}</span>,
    enableSorting: false,
    size: 100,
  },

  {
    accessorKey: "name_customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Khách hàng" />,
    cell: ({ row }) => <span className="font-mono">{row.original.name_customer}</span>,
    enableSorting: false,
    size: 150,
  },

  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Điện thoại" />,
    cell: ({ row }) => <span className="font-mono">{row.original.phone}</span>,
    enableSorting: false,
    size: 120,
  },

  {
    accessorKey: "address",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ" />,
    cell: ({ row }) => <span className="block max-w-[150px] truncate">{row.original.address}</span>,
    enableSorting: false,
    size: 150,
  },

  {
    accessorKey: "seller",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Người bán" />,
    cell: ({ row }) => <span>{row.original.seller}</span>,
    enableSorting: false,
    size: 120,
  },

  {
    accessorKey: "kenh_ban",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kênh bán" />,
    cell: ({ row }) => <span>{row.original.kenh_ban}</span>,
    enableSorting: false,
    size: 100,
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Số lượng" />,
    cell: ({ row }) => <div className="text-right">{row.original.quantity}</div>,
    enableSorting: false,
    size: 80,
  },

  {
    accessorKey: "giam_gia",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Giảm giá" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.giam_gia || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
    size: 100,
  },

  {
    accessorKey: "tien_hang",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Tiền hàng" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.tien_hang || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
    size: 110,
  },

  {
    accessorKey: "thanh_tien",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Thành tiền" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.thanh_tien || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
    size: 120,
  },

  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      const s = String(row.original.status ?? "").toLowerCase();
      let className = "bg-muted/20 text-muted-foreground";
      
      // Hoàn thành - màu xanh lá
      if (s.includes("hoàn thành") || s.includes("hoành thành") || s.includes("thành công")) {
        className = "bg-green-600 text-white";
      }
      // Đang xử lý, Đã xác nhận - màu vàng
      else if (s.includes("đang xử lý") || s.includes("đã xác nhận") || s.includes("chờ xác nhận")) {
        className = "bg-yellow-500 text-black";
      }
      // Không giao được, Hoàn, Hủy - màu đỏ
      else if (
        s.includes("không giao được") || 
        s.includes("đã hủy") || 
        s.includes("hủy") || 
        s.includes("hoàn") ||
        s.includes("trả hàng")
      ) {
        className = "bg-red-600 text-white";
      }
      // Phiếu tạm - màu xanh dương
      else if (s.includes("phiếu tạm") || s.includes("nháp")) {
        className = "bg-blue-600 text-white";
      }

      return <Badge className={className}>{row.original.status}</Badge>;
    },
    enableSorting: false,
    size: 120,
  },

  {
    accessorKey: "create_time",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày tạo" />,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.create_time instanceof Date
          ? row.original.create_time.toLocaleDateString("vi-VN")
          : row.original.create_time}
      </span>
    ),
    enableSorting: false,
    size: 100,
  },

  {
    accessorKey: "note",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />,
    cell: ({ row }) => <span className="block max-w-[120px] truncate">{row.original.note}</span>,
    enableSorting: false,
    size: 120,
  },

  // Actions
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
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
    size: 60,
  },
];
