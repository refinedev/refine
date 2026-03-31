"use client";

import { cn } from "@/lib/utils";

export function DataTableToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

DataTableToolbar.displayName = "DataTableToolbar";
