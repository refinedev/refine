"use client";

import type { Column } from "@tanstack/react-table";

import { TableRow, TableCell } from "@/registry/new-york/ui/table";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import { getCommonStyles } from "@/registry/new-york/refine-ui/data-table/data-table";
import { useDataTableOverflow } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";

export function DataTableSkeleton<TData>({
  columns,
  rowCount,
}: {
  columns: Column<TData>[];
  rowCount: number;
}) {
  const isOverflowing = useDataTableOverflow();

  return (
    <>
      {Array.from({ length: rowCount < 1 ? 1 : rowCount }).map(
        (_, rowIndex) => (
          <TableRow key={`skeleton-row-${rowIndex}`} aria-hidden="true">
            {columns.map((column) => (
              <TableCell
                key={`skeleton-cell-${rowIndex}-${column.id}`}
                style={getCommonStyles({ column, isOverflowing })}
              >
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ),
      )}
    </>
  );
}

DataTableSkeleton.displayName = "DataTableSkeleton";
