"use client";

import { Download } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { recentLeadsColumns } from "./columns.crm";
import { recentLeadsData } from "./crm.config";

export function TableCards() {
  const table = useDataTableInstance({
    data: recentLeadsData,
    columns: recentLeadsColumns,
    getRowId: (row) => row.id.toString(),
  });

  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs">
      <Card>
        <CardHeader>
          <CardTitle>Video gần đây</CardTitle>
          <CardDescription>Theo dõi và quản lý video gần đây của bạn.</CardDescription>
          <CardAction>
            <div className="flex items-center gap-2">
              <DataTableViewOptions table={table} />
              <Button variant="outline" size="sm">
                <Download />
                <span className="hidden lg:inline">Xuất</span>
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="flex size-full flex-col gap-4">
          <div className="overflow-hidden rounded-md">
            <DataTable table={table} columns={recentLeadsColumns} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
