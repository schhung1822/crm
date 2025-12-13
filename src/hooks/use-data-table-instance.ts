import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  // ❌ bỏ getPaginationRowModel
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type UseDataTableInstanceProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  enableRowSelection?: boolean;
  defaultPageIndex?: number;
  defaultPageSize?: number;
  getRowId?: (row: TData, index: number) => string;
};

export function useDataTableInstance<TData, TValue>({
  data,
  columns,
  enableRowSelection = true,
  defaultPageIndex = 0,
  defaultPageSize = 10,
  getRowId,
}: UseDataTableInstanceProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    // KHÔNG đưa pagination vào đây nữa, vì ta phân trang bên ngoài
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    // optional: nếu muốn dùng giá trị mặc định ở chỗ khác
    initialState: {
      pagination: {
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
      },
    },

    enableRowSelection,
    getRowId: getRowId ?? ((row) => (row as any).id?.toString() ?? ""),

    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // ❌ bỏ getPaginationRowModel – để table.getRowModel() trả về toàn bộ 120 row
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return table;
}
