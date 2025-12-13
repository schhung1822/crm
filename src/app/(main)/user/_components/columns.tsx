import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { userSchema, Users } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

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

  // Tên người dùng + Drawer chi tiết
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên người dùng" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableSorting: false,
  },

  // Tài khoản (username)
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.username}</span>,
    enableSorting: false,
  },

  // Email
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.email}</span>,
    enableSorting: false,
  },

  // Video
  {
    accessorKey: "classify",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vai trò" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.classify}</span>,
    enableSorting: false,
  },

  // Likes
  {
    accessorKey: "created_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => <span className="font-mono">{row.original.create_time.toLocaleDateString("vi-VN")}</span>,
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
