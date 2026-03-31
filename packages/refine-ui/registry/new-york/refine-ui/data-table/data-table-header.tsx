"use client";

import type { HeaderGroup } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { TableHeader, TableRow, TableHead } from "@/registry/new-york/ui/table";
import { getCommonStyles } from "@/registry/new-york/refine-ui/data-table/data-table";
import { useDataTableOverflow } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";
import { cn } from "@/lib/utils";

export function DataTableHeader<TData>({
  headerGroups,
  className,
}: {
  headerGroups: HeaderGroup<TData>[];
  className?: string;
}) {
  const isOverflowing = useDataTableOverflow();

  return (
    <TableHeader className={className}>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              style={getCommonStyles({
                column: header.column,
                isOverflowing,
              })}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

DataTableHeader.displayName = "DataTableHeader";
