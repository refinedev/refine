"use client";

import { TableRow, TableCell } from "@/registry/new-york/ui/table";
import { useDataTableOverflow } from "@/registry/new-york/refine-ui/data-table/data-table-overflow-wrapper";
import { cn } from "@/lib/utils";

export function DataTableEmpty({
  columnCount,
  title,
  description,
  children,
}: {
  columnCount: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const isOverflowing = useDataTableOverflow();

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell
        colSpan={columnCount}
        className={cn("relative", "text-center")}
        style={{ height: "490px" }}
      >
        <div
          className={cn(
            "absolute",
            "inset-0",
            "flex",
            "flex-col",
            "items-center",
            "justify-center",
            "gap-2",
            "bg-background",
          )}
          style={{
            position: isOverflowing.horizontal ? "sticky" : "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: isOverflowing.horizontal ? 2 : 1,
            width: isOverflowing.horizontal ? "fit-content" : "100%",
            minWidth: "300px",
          }}
        >
          {children ?? (
            <>
              <div
                className={cn("text-lg", "font-semibold", "text-foreground")}
              >
                {title ?? "No data to display"}
              </div>
              <div className={cn("text-sm", "text-muted-foreground")}>
                {description ?? "This table is empty for the time being."}
              </div>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

DataTableEmpty.displayName = "DataTableEmpty";
