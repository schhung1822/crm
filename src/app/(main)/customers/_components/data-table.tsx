"use client";

import * as React from "react";

import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExportDialog, type ExportFormat, type DateRange } from "@/components/ui/export-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { exportData, filterDataByDateRange } from "@/lib/export-utils";

import { dashboardColumns } from "./columns";
import { userSchema, Users } from "./schema";

export function DataTable({ data: initialData }: { data: Users[] }) {
  const [data, setData] = React.useState<Users[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.customer_ID.toLowerCase().includes(term) ||
        item.phone.toLowerCase().includes(term) ||
        item.create_by.toLowerCase().includes(term),
    );
  }, [data, searchTerm]);

  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.customer_ID.toString(),
  });

  const handleExport = React.useCallback(
    (format: ExportFormat, dateRange: DateRange) => {
      setIsExporting(true);

      try {
        let dataToExport = filteredData;

        if (dateRange.from || dateRange.to) {
          dataToExport = filterDataByDateRange(filteredData, "create_time", dateRange);
        }

        const headers = {
          customer_ID: "Mã khách hàng",
          name: "Tên khách hàng",
          phone: "Số điện thoại",
          class: "Phân loại",
          gender: "Giới tính",
          birth: "Ngày sinh",
          create_time: "Ngày tạo",
          last_payment: "Thanh toán gần nhất",
          company: "Công ty",
          address: "Địa chỉ",
          create_by: "Người tạo",
          note: "Ghi chú",
          branch: "Chi nhánh",
          no_hien_tai: "Nợ hiện tại",
          tong_ban: "Tổng bán",
          tong_ban_tru_tra_hang: "Tổng bán trừ trả hàng",
        };

        const dateStr = new Date().toISOString().split("T")[0];
        const filename = `customers_${dateStr}`;

        exportData({
          format,
          data: dataToExport,
          headers,
          filename,
        });

        toast.success(`Xuất ${dataToExport.length} khách hàng thành công!`);
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
