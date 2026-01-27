import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";

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

import { Academy } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

export const dashboardColumns: ColumnDef<Academy>[] = [
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
    enableHiding: true,
    meta: { label: "Tên" },
  },

  // Phone
  {
    accessorKey: "phone",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Số điện thoại" />,
    cell: ({ row }) => <span className="font-mono">{row.original.phone}</span>,
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Số điện thoại" },
  },

  // Email
  {
    accessorKey: "city",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <span>{row.original.email}</span>,
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Email" },
  },

  // Event Name
  {
    accessorKey: "role",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sự kiện" />,
    cell: ({ row }) => (
      <span className="rounded-md border border-pink-500/40 bg-pink-500/10 px-2 py-1 text-xs font-medium text-pink-700">
        {row.original.event_name}
      </span>
    ),
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Sự kiện" },
  },

  // Co so
  {
    accessorKey: "co_so",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Khu vực" />,
    cell: ({ row }) => <span>{row.original.q1}</span>,
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Khu vực" },
  },

  // Name NV
  {
    accessorKey: "name_nv",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ngành nghề" />,
    cell: ({ row }) => <span>{row.original.q2}</span>,
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Ngành nghề" },
  },

  // Voucher
  {
    accessorKey: "voucher",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Voucher" />,
    cell: ({ row }) => <span>{row.original.voucher}</span>,
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Voucher" },
  },

  // Quan tâm OA
  {
    accessorKey: "oa_interest",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Quan tâm OA" />,
    cell: ({ row }) => {
      const value = row.original.oa_interest;
      const isInterested = value === "Quan tâm";
      return (
        <span
          className={
            isInterested
              ? "rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700"
              : "border-muted-foreground/30 bg-muted text-muted-foreground rounded-md border px-2 py-1 text-xs font-medium"
          }
        >
          {value}
        </span>
      );
    },
    enableSorting: false,
    enableHiding: true,
    meta: { label: "Quan tâm OA" },
  },

  // User ID
  {
    accessorKey: "user_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="User ID" />,
    cell: ({ row }) => {
      const userId = row.original.user_id;
      if (!userId || userId === "{{user_id}}") {
        return <span></span>;
      }
      return <span className="font-mono text-sm">{userId}</span>;
    },
    enableSorting: false,
    enableHiding: true,
    meta: { label: "User ID" },
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
