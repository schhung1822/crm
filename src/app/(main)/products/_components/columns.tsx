import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { productSchema, Product } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

// Format số với dấu chấm (1.234.567)
const formatNumber = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const dashboardColumns: ColumnDef<Product>[] = [
  // Checkbox chọn nhiều dòng
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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

  // Mã sản phẩm
  {
    accessorKey: "pro_ID",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mã SP" />,
    cell: ({ row }) => <span className="font-mono">{row.original.pro_ID}</span>,
    enableSorting: false,
  },

  // Tên
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên" />,
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        <TableCellViewer item={row.original} />
      </div>
    ),
    enableSorting: false,
  },

  // Thương hiệu
  {
    accessorKey: "brand",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thương hiệu" />,
    cell: ({ row }) => <span className="block max-w-[200px] truncate">{row.original.brand}</span>,
    enableSorting: false,
  },

  // Phân loại
  {
    accessorKey: "class",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phân loại" />,
    cell: ({ row }) => <span className="block max-w-[300px] truncate">{row.original.class}</span>,
    enableSorting: false,
  },

  // Giá bán
  {
    accessorKey: "gia_ban",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Giá bán" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.gia_ban || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
  },

  // Giá vốn
  {
    accessorKey: "gia_von",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-right" column={column} title="Giá vốn" />,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{(row.original.gia_von || 0).toLocaleString("vi-VN")}</div>
    ),
    enableSorting: false,
  },

  // Thuộc tính
  {
    accessorKey: "property",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thuộc tính" />,
    cell: ({ row }) => <span className="block max-w-[200px] truncate">{row.original.property}</span>,
    enableSorting: false,
  },

  // Actions
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <EllipsisVertical />
            <span className="sr-only">Mở menu</span>
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
