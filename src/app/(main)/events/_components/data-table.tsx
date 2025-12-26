"use client";

import * as React from "react";

import { Plus, Search } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { academySchema, Academy } from "./schema";

export function DataTable({ data: initialData }: { data: Academy[] }) {
  const [data, setData] = React.useState<Academy[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      item.phone.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term) ||
      item.role.toLowerCase().includes(term)
    );
  }, [data, searchTerm]);

  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.phone.toString(),
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên, mã, SĐT, người tạo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Thêm Học viên</span>
          </Button>
        </div>
      </div>
      <div className="table-scroll overflow-hidden rounded-lg">
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
