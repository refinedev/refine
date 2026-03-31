"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select";
import { Button } from "@/registry/new-york/ui/button";
import { cn } from "@/lib/utils";

type DataTableCursorPaginationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isFetching?: boolean;
  pageSize?: number;
  setPageSize?: (size: number) => void;
};

export function DataTableCursorPagination({
  hasNextPage,
  hasPreviousPage,
  onNext,
  onPrevious,
  isFetching,
  pageSize,
  setPageSize,
}: DataTableCursorPaginationProps) {
  const pageSizeOptions = useMemo(() => {
    const baseOptions = [10, 20, 30, 40, 50];
    const optionsSet = new Set(baseOptions);

    if (pageSize && !optionsSet.has(pageSize)) {
      optionsSet.add(pageSize);
    }

    return Array.from(optionsSet).sort((a, b) => a - b);
  }, [pageSize]);

  return (
    <div
      className={cn(
        "flex",
        "items-center",
        "justify-between",
        "flex-wrap",
        "px-2",
        "w-full",
        "gap-2",
      )}
    >
      <div className="flex-1" />
      <div className={cn("flex", "items-center", "flex-wrap", "gap-2")}>
        {pageSize !== undefined && setPageSize && (
          <div className={cn("flex", "items-center", "gap-2")}>
            <span className={cn("text-sm", "font-medium")}>Rows per page</span>
            <Select
              value={`${pageSize}`}
              onValueChange={(v) => setPageSize(Number(v))}
            >
              <SelectTrigger className={cn("h-8", "w-[70px]")}>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className={cn("flex", "items-center", "gap-2")}>
          <Button
            variant="outline"
            className={cn("h-8", "w-8", "p-0")}
            onClick={onPrevious}
            disabled={!hasPreviousPage || isFetching}
            aria-label="Go to previous page"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className={cn("h-8", "w-8", "p-0")}
            onClick={onNext}
            disabled={!hasNextPage || isFetching}
            aria-label="Go to next page"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

DataTableCursorPagination.displayName = "DataTableCursorPagination";
