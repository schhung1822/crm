import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { academySchema, Academy } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

export const dashboardColumns: ColumnDef<Academy>[] = [
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

  // Tên
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableSorting: false,
  },

  // Phone
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.phone}</span>,
    enableSorting: false,
  },

  // City
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tỉnh/Thành phố" />
    ),
    cell: ({ row }) => <span>{row.original.city}</span>,
    enableSorting: false,
  },

  // Role
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vai trò" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs px-4 py-1.5 bg-secondary/10 rounded-md border border-secondary/50">
        {row.original.role}
      </span>
    ),
    enableSorting: false,
  },

  // Co so
  {
    accessorKey: "co_so",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cơ sở" />
    ),
    cell: ({ row }) => <span>{row.original.co_so}</span>,
    enableSorting: false,
  },

  // Name NV
  {
    accessorKey: "name_nv",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên NV" />
    ),
    cell: ({ row }) => <span>{row.original.name_nv}</span>,
    enableSorting: false,
  },

  // Voucher
  {
    accessorKey: "voucher",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Voucher" />
    ),
    cell: ({ row }) => <span>{row.original.voucher}</span>,
    enableSorting: false,
  },

  // User ID
  {
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
    cell: ({ row }) => {
      const userId = row.original.user_id;
      if (!userId || userId === "{{user_id}}") {
        return <span></span>;
      }
      return <span className="font-mono text-sm">{userId}</span>;
    },
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
