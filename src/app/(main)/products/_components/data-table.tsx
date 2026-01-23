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
import { exportData } from "@/lib/export-utils";

import { dashboardColumns } from "./columns";
import { productSchema, Product } from "./schema";

export function DataTable({ data: initialData }: { data: Product[] }) {
  const [data, setData] = React.useState<Product[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.pro_ID.toLowerCase().includes(term) ||
        item.brand.toLowerCase().includes(term) ||
        (item.property ? item.property.toLowerCase().includes(term) : false),
    );
  }, [data, searchTerm]);

  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.pro_ID.toString(),
  });

  const handleExport = React.useCallback(
    (format: ExportFormat, dateRange: DateRange) => {
      setIsExporting(true);

      try {
        const dataToExport = filteredData;

        const headers = {
          pro_ID: "Mã sản phẩm",
          name: "Tên sản phẩm",
          brand: "Thương hiệu",
          class: "Phân loại",
          gia_ban: "Giá bán",
          gia_von: "Giá vốn",
          property: "Thuộc tính",
        };

        const dateStr = new Date().toISOString().split("T")[0];
        const filename = `products_${dateStr}`;

        exportData({
          format,
          data: dataToExport,
          headers,
          filename,
        });

        toast.success(`Xuất ${dataToExport.length} sản phẩm thành công!`);
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
        title="Xuất dữ liệu sản phẩm"
        description="Chọn định dạng và khoảng thời gian để xuất dữ liệu sản phẩm"
      />
    </div>
  );
}
