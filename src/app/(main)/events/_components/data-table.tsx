"use client";

import * as React from "react";

import Link from "next/link";

import { Download, Search, LayoutTemplate } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { exportData, filterDataByDateRange } from "@/lib/export-utils";

import { dashboardColumns } from "./columns";
import { academySchema, Academy } from "./schema";

export function DataTable({ data: initialData }: { data: Academy[] }) {
  const [data, setData] = React.useState<Academy[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState<string>("all");
  const [renderKey, setRenderKey] = React.useState(0);
  const [exportDialogOpen, setExportDialogOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  // Get unique event names
  const eventNames = React.useMemo(() => {
    const names = new Set(data.map((item) => item.event_name).filter(Boolean));
    console.log("Event names found:", Array.from(names));
    return Array.from(names).sort();
  }, [data]);

  const filteredData = React.useMemo(() => {
    let filtered = data;

    console.log("Filtering - selectedEvent:", selectedEvent, "Total data:", data.length);

    // Filter by event name
    if (selectedEvent !== "all") {
      filtered = filtered.filter((item) => item.event_name === selectedEvent);
      console.log("After event filter:", filtered.length);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.phone.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term),
      );
      console.log("After search filter:", filtered.length);
    }

    console.log("Final filtered data:", filtered.length);
    return filtered;
  }, [data, searchTerm, selectedEvent]);

  const columns = withDndColumn(dashboardColumns);

  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.phone.toString(),
  });

  // Force table to update when filters change
  React.useEffect(() => {
    table.resetRowSelection();
    table.setPageIndex(0);
    setRenderKey((prev) => prev + 1);
  }, [selectedEvent, searchTerm]);

  // Handle export
  const handleExport = React.useCallback(
    (format: ExportFormat, dateRange: DateRange) => {
      setIsExporting(true);

      try {
        // Filter by date range if provided (assuming there's a date field)
        // You can change 'created_at' to the appropriate date field name
        const dataToExport = filteredData;

        // If your data has a date field, uncomment this:
        // if (dateRange.from || dateRange.to) {
        //   dataToExport = filterDataByDateRange(filteredData, 'created_at', dateRange);
        // }

        // Define headers for export
        const headers = {
          name: "Tên",
          phone: "Số điện thoại",
          email: "Email",
          title_q1: "Câu hỏi 1",
          q1: "Trả lời 1",
          title_q2: "Câu hỏi 2",
          q2: "Trả lời 2",
          title_q3: "Câu hỏi 3",
          q3: "Trả lời 3",
          title_q4: "Câu hỏi 4",
          q4: "Trả lời 4",
          title_q5: "Câu hỏi 5",
          q5: "Trả lời 5",
          voucher: "Voucher",
          event_name: "Tên sự kiện",
          user_id: "User ID",
        };

        // Generate filename
        const eventName = selectedEvent !== "all" ? `_${selectedEvent}` : "";
        const dateStr = new Date().toISOString().split("T")[0];
        const filename = `events${eventName}_${dateStr}`;

        // Export data
        exportData({
          format,
          data: dataToExport,
          headers,
          filename,
        });

        toast.success(`Xuất ${dataToExport.length} dòng dữ liệu thành công!`);
        setExportDialogOpen(false);
      } catch (error) {
        console.error("Export error:", error);
        toast.error("Có lỗi xảy ra khi xuất dữ liệu");
      } finally {
        setIsExporting(false);
      }
    },
    [filteredData, selectedEvent],
  );

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Tìm kiếm theo tên, SĐT, email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Chọn sự kiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả sự kiện</SelectItem>
              {eventNames.map((eventName) => (
                <SelectItem key={eventName} value={eventName}>
                  {eventName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {(selectedEvent !== "all" || searchTerm) && (
            <Badge variant="secondary" className="ml-2">
              {filteredData.length} / {data.length} kết quả
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Link className="cursor-pointer" href="./admin/templates/eac-checkin">
            <Button className="cursor-pointer" variant="outline" size="sm">
              <LayoutTemplate />
              <span className="hidden lg:inline">Quản lý template</span>
            </Button>
          </Link>
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
      <div className="nice-scroll overflow-hidden rounded-lg" key={renderKey}>
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>

      <ExportDialog
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        onExport={handleExport}
        isExporting={isExporting}
        title="Xuất dữ liệu sự kiện"
        description="Chọn định dạng và khoảng thời gian để xuất dữ liệu sự kiện"
      />
    </div>
  );
}
