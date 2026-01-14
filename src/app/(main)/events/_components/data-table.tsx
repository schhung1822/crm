"use client";

import * as React from "react";

import { Plus, Search, LayoutTemplate } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { academySchema, Academy } from "./schema";

export function DataTable({ data: initialData }: { data: Academy[] }) {
  const [data, setData] = React.useState<Academy[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedEvent, setSelectedEvent] = React.useState<string>("all");
  const [renderKey, setRenderKey] = React.useState(0);
  
  // Get unique event names
  const eventNames = React.useMemo(() => {
    const names = new Set(data.map(item => item.event_name).filter(Boolean));
    console.log('Event names found:', Array.from(names));
    return Array.from(names).sort();
  }, [data]);
  
  const filteredData = React.useMemo(() => {
    let filtered = data;
    
    console.log('Filtering - selectedEvent:', selectedEvent, 'Total data:', data.length);
    
    // Filter by event name
    if (selectedEvent !== "all") {
      filtered = filtered.filter((item) => item.event_name === selectedEvent);
      console.log('After event filter:', filtered.length);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(term) ||
        item.phone.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term)
      );
      console.log('After search filter:', filtered.length);
    }
    
    console.log('Final filtered data:', filtered.length);
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
    setRenderKey(prev => prev + 1);
  }, [selectedEvent, searchTerm]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
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
        </div>
      </div>
      <div className="table-scroll overflow-hidden rounded-lg" key={renderKey}>
        <DataTableNew
          dndEnabled
          table={table}
          columns={columns}
          onReorder={setData}
        />
      </div>
    </div>
  );
}
