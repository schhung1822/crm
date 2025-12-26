import type { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, Link as LinkIcon } from "lucide-react"; // 👈 đổi tên icon
import NextLink from "next/link"; // 👈 Link của Next
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
import { videoSchema, Video } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";

const toAt = (v?: string) => (v ? (v.startsWith("@") ? v : `@${v}`) : "");

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

  // Tiêu đề (mở Drawer chi tiết video)
  {
    accessorKey: "video_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tiêu đề" />
    ),
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableSorting: false,
  },

  // Link video TikTok
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Link video" />
    ),
    cell: ({ row }) => (
      <a
        className="font-mono hover:text-amber-600"
        href={`https://tiktok.com/video/${row.original.video_id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LINK
      </a>
    ),
    enableSorting: false,
  },

  // View
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-left"
        column={column}
        title="Lượt xem"
      />
    ),
    cell: ({ row }) => (
      <div className="text-left tabular-nums">
        {row.original.view.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // Likes
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-left"
        column={column}
        title="Lượt thích"
      />
    ),
    cell: ({ row }) => (
      <div className="text-left tabular-nums">
        {row.original.likes.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // Comment
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-full text-left"
        column={column}
        title="Bình luận"
      />
    ),
    cell: ({ row }) => (
      <div className="text-left tabular-nums">
        {row.original.comment.toLocaleString("vi-VN")}
      </div>
    ),
    enableSorting: false,
  },

  // Ngày đăng
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
    cell: ({ row }) => (
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
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <NextLink
              href={`/kenh/${toAt(row.original.id_kenh)}/video`}
              prefetch={false}
            >
              Xem kênh này
            </NextLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              href={`https://tiktok.com/video/${row.original.video_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở video TikTok
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Tạo bản sao</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
