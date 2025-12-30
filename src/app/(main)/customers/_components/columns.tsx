import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { userSchema, Users } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

// Format số với dấu chấm (1.234.567)
const formatNumber = (n?: number | string) => {
  const num = Number(n ?? 0) || 0;
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const dashboardColumns: ColumnDef<Users>[] = [
  // Checkbox chọn nhiều dòng
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
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Họ tên
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        <TableCellViewer item={row.original} />
      </div>
    ),
    enableSorting: false,
  },

  // Họ tên
  {
    accessorKey: "customer_ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã khách hàng" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.customer_ID}</span>,
    enableSorting: false,
  },

  // Điện thoại
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Điện thoại" />
    ),
    cell: ({ row }) => <span className="font-mono max-w-[300px] truncate block">{row.original.phone}</span>,
    enableSorting: false,
  },

  // Phân loại khách
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phân loại khách" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.class}</span>,
    enableSorting: false,
  },

  // Giới tính
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giới tính" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.gender}</span>,
    enableSorting: false,
  },

  // Ngày sinh
  {
    accessorKey: "birth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày sinh" />
    ),
    cell: ({ row }) => {
      const birth = row.original.birth;
      if (!birth) return <span className="text-sm max-w-[300px] truncate block"></span>;
      
      return (
        <span className="text-sm max-w-[300px] truncate block">
          {birth instanceof Date
            ? birth.toLocaleDateString("vi-VN")
            : birth}
        </span>
      );
    },
    enableSorting: false,
  },

  // Công ty
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Công ty" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.company}</span>,
    enableSorting: false,
  },

  // Địa chỉ
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.address}</span>,
    enableSorting: false,
  },

  // Tạo bởi
  {
    accessorKey: "create_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tạo bởi" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.create_by}</span>,
    enableSorting: false,
  },

  // Lần thanh toán cuối
  {
    accessorKey: "last_payment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lần thanh toán cuối" />
    ),
    cell: ({ row }) => (
      <span className="text-sm max-w-[300px] truncate block">
        {row.original.last_payment instanceof Date
          ? row.original.last_payment.toLocaleDateString("vi-VN")
          : row.original.last_payment}
      </span>
    ),
    enableSorting: false,
  },

  // Ghi chú
  {
    accessorKey: "note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ghi chú" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.note}</span>,
    enableSorting: false,
  },

  // Chi nhánh
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chi nhánh" />
    ),
    cell: ({ row }) => <span className="max-w-[300px] truncate block">{row.original.branch}</span>,
    enableSorting: false,
  },

  // Nợ hiện tại
  {
    accessorKey: "no_hien_tai",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Nợ hiện tại"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.no_hien_tai || 0)}
      </div>
    ),
    enableSorting: false,
  },

  // Tổng bán
  {
    accessorKey: "tong_ban",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Tổng bán"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.tong_ban || 0)}
      </div>
    ),
    enableSorting: false,
  },

  // Nợ sau trừ trả
  {
    accessorKey: "tong_ban_tru_tra_hang",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Nợ sau trừ trả"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatNumber(row.original.tong_ban_tru_tra_hang || 0)}
      </div>
    ),
    enableSorting: false,
  },

  // Ngày tạo
  {
    accessorKey: "create_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => (
      <span className="text-sm max-w-[300px] truncate block">
        {row.original.create_time instanceof Date
          ? row.original.create_time.toLocaleDateString("vi-VN")
          : row.original.create_time}
      </span>
    ),
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
            <span className="sr-only">Mở menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>
              Xem chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem>Tạo bản sao</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
