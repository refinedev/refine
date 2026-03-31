"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTableCellBoolean({
  value,
  className,
}: {
  value: boolean;
  className?: string;
}) {
  return value ? (
    <Check className={cn("h-4 w-4 text-primary", className)} />
  ) : (
    <X className={cn("h-4 w-4 text-muted-foreground", className)} />
  );
}

DataTableCellBoolean.displayName = "DataTableCellBoolean";
