"use client";

import * as React from "react";

import { Download, Search } from "lucide-react";
import { toast } from "sonner";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";
import { Button } from "@/components/ui/button";
import { ExportDialog, type ExportFormat, type DateRange } from "@/components/ui/export-dialog";
import { Input } from "@/components/ui/input";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { exportData } from "@/lib/export-utils";

import { dashboardColumns } from "./columns";
import { UsersOA } from "./schema";

export function DataTable({ data: initialData }: { data: UsersOA[] }) {
  const [data, setData] = React.useState<UsersOA[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.alias.toLowerCase().includes(term) ||
        item.user_id.toLowerCase().includes(term) ||
        item.phone.toLowerCase().includes(term) ||
        item.city.toLowerCase().includes(term) ||
        item.district.toLowerCase().includes(term),
    );
  }, [data, searchTerm]);

  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.user_id,
  });

  const handleExport = React.useCallback(
    (format: ExportFormat, _dateRange: DateRange) => {
      setIsExporting(true);
      void _dateRange;

      try {
        const dataToExport = filteredData;

        const headers = {
          user_id: "Mã người dùng",
          alias: "Tên hiển thị",
          follower: "Theo dõi",
          is_sensitive: "Nhạy cảm",
          avatar: "Ảnh đại diện",
          phone: "Số điện thoại",
          city: "Thành phố",
          address: "Địa chỉ",
          district: "Quận/Huyện",
        };

        const dateStr = new Date().toISOString().split("T")[0];
        const filename = `zalo_oa_${dateStr}`;

        exportData({
          format,
          data: dataToExport,
          headers,
          filename,
        });

        toast.success(`Xuất ${dataToExport.length} người dùng thành công!`);
        setExportDialogOpen(false);
      } catch (error) {
        console.error("Export error:", error);
        toast.error("Có lỗi xảy ra khi xuất dữ liệu");
      } finally {
        setIsExporting(false);
      }
    },
    [filteredData],
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm kiếm theo tên, mã, SĐT, người tạo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportDialogOpen(true)}
            disabled={filteredData.length === 0}
          >
            <Download className="size-4" />
            <span className="hidden lg:inline">Xuất</span>
          </Button>
        </div>
      </div>
      <div className="nice-scroll overflow-hidden rounded-lg">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={handleExport}
        isExporting={isExporting}
        title="Xuất dữ liệu khách hàng"
        description="Chọn định dạng và khoảng thời gian để xuất dữ liệu khách hàng"
      />
    </div>
  );
}
