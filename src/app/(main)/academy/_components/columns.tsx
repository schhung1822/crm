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

  // Tên kênh + Drawer chi tiết
  {
    accessorKey: "id_kenh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ tên" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableSorting: false,
  },

  // id_kenh (username)
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span className="font-mono">@{row.original.id_kenh}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "id_kenh",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-left"
        column={column}
        title="Link kênh"
      />
    ),
    cell: ({ row }) => (
      <a
        className="font-mono hover:text-amber-600"
        href={`https://www.tiktok.com/@${row.original.id_kenh}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Xem kênh
      </a>
    ),
    enableSorting: false,
  },

  //Nhóm
  {
    accessorKey: "class",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhóm" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs px-4 py-1.5 bg-secondary/10 rounded-md border border-secondary/50">
        {row.original.class}
      </span>
    ),
    enableSorting: false,
  },

  // Follower
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Năm sinh"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.year}
      </div>
    ),
    enableSorting: false,
  },

  // Phone
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Số điện thoại"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.phone}
      </div>
    ),
    enableSorting: false,
  },

  // City
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Tỉnh/Thành phố"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.city}
      </div>
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
