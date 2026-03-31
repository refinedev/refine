"use client";

import type { Row, Column } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { TableBody, TableRow, TableCell } from "@/registry/new-york/ui/table";
import { getCommonStyles } from "@/registry/new-york/refine-ui/data-table/data-table";
import { useDataTableOverflow } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";
import { cn } from "@/lib/utils";

export function DataTableBody<TData>({
  rows,
  leafColumns,
  children,
  className,
}: {
  rows: Row<TData>[];
  leafColumns: Column<TData>[];
  children?: React.ReactNode;
  className?: string;
}) {
  const isOverflowing = useDataTableOverflow();

  return (
    <TableBody className={cn("relative", className)}>
      {children
        ? children
        : rows.map((row) => (
            <TableRow
              key={
                row.original &&
                typeof row.original === "object" &&
                "id" in row.original
                  ? String((row.original as Record<string, unknown>).id)
                  : row.id
              }
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={getCommonStyles({
                    column: cell.column,
                    isOverflowing,
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
    </TableBody>
  );
}

DataTableBody.displayName = "DataTableBody";
