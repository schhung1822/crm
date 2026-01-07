"use client";

import * as React from "react";
import { Plus, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";

import { dashboardColumns as makeColumns, type Stats } from "./columns";
import type { Channel } from "./schema";
import { fetchChannelsByDateRange } from "@/server/server-actions";

export function DataTable({
  data: initialData = [],
  stats,
}: {
  data?: Channel[];
  stats: Stats;
}) {
  const columns = withDndColumn(makeColumns(stats));
  const searchParams = useSearchParams();

  const [data, setData] = React.useState<Channel[]>(() => initialData);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Fetch data khi date range thay đổi
  React.useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (from || to) {
      setIsLoading(true);
      fetchChannelsByDateRange(from || undefined, to || undefined)
        .then((filteredData) => {
          setData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData(initialData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setData(initialData);
    }
  }, [searchParams, initialData]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      item.name_customer.toLowerCase().includes(term) ||
      item.order_ID.toLowerCase().includes(term) ||
      (item.phone ? item.phone.toLowerCase().includes(term) : false) ||
      (item.seller ? item.seller.toLowerCase().includes(term) : false)
    );
  }, [data, searchTerm]);

  const table = useDataTableInstance({
    data: filteredData,
    columns,
    getRowId: (row) => row.order_ID.toString(),
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
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Thêm kênh</span>
          </Button>
        </div>
      </div>
      <div className="table-scroll overflow-hidden rounded-lg">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>
    </div>
  );
}
