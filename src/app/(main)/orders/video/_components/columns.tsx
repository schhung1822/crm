import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Link } from "lucide-react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { videoSchema, Video } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

export const dashboardColumns: ColumnDef<Video>[] = [
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
    accessorKey: "video_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiêu đề" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableSorting: false,
  },

  // id_kenh (username)
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link video" />
    ),
    cell: ({ row }) => <a className="font-mono hover:text-amber-600" href={`https://tiktok.com/video/${row.original.video_id}`}>LINK</a>,
    enableSorting: false,
  },

  // Follower
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Lượt xem"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.view.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // Video
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Lượt thích"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.likes.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // Likes
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-right"
        column={column}
        title="Bình luận"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.comment.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // TikTok ID
  {
    accessorKey: "create_time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đăng" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.create_time.toLocaleDateString("vi-VN")}
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
