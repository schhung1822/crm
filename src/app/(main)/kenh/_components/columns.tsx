import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { channelSchema, Channel } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

// ---- Stats type ----
export type Stats = {
  totalChannels: number;
  totalFollowers: number;
  totalVideos: number;
  totalLikes: number;
  first_follower?: number;
  first_video?: number;
  first_like?: number;
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

  // Kênh (TableCellViewer)
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kênh" />
    ),
    cell: ({ row }) => (
      <TableCellViewer item={row.original} stats={stats} /> // ✅ truyền stats vào
    ),
    enableSorting: false,
  },

  {
    accessorKey: "id_kenh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => <span className="font-mono">@{row.original.id_kenh}</span>,
    enableSorting: false,
  },

  {
    accessorKey: "tiktok_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link kênh" />
    ),
    cell: ({ row }) => (
      <a
        className="font-mono hover:text-amber-600"
        href={`https://www.tiktok.com/@${row.original.tiktok_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Xem kênh
      </a>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "follower",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Followers"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.follower.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "video_quantiy",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Số video"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.video_quantiy.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  {
    accessorKey: "like",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Lượt thích"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.like.toLocaleString("vi-VN")}
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
