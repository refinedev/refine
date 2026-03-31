"use client";

import type { Table as ReactTable } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function DataTableColumnVisibility<TData>({
  table,
  label,
}: {
  table: ReactTable<TData>;
  label?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={cn("ml-auto", "h-8")}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {label ?? "Columns"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DataTableColumnVisibility.displayName = "DataTableColumnVisibility";
