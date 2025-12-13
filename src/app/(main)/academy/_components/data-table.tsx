"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "@/components/data-table/data-table";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { withDndColumn } from "@/components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { channelSchema, Channel } from "./schema";

export function DataTable({ data: initialData }: { data: Channel[] }) {
  const [data, setData] = React.useState<Channel[]>(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({
    data,
    columns,
    getRowId: (row) => row.id_kenh.toString(),
  });


  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          Kiểu xem
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Tất cả</SelectItem>
            <SelectItem value="past-performance">Gen X</SelectItem>
            <SelectItem value="key-personnel">Gen Y</SelectItem>
            <SelectItem value="focus-documents">Gen Z</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Tất cả</TabsTrigger>
          <TabsTrigger value="past-performance">
            Gen X <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Gen Y <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Gen Z</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Thêm Học viên</span>
          </Button>
        </div>
      </div>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg">
          <DataTableNew
            dndEnabled
            table={table}
            columns={columns}
            onReorder={setData}
          />
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
    </Tabs>
  );
}
