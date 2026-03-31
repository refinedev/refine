"use client";

import { cn } from "@/lib/utils";

export function DataTableCellNumber({
  value,
  options,
  locale,
  className,
}: {
  value: number;
  options?: Intl.NumberFormatOptions;
  locale?: string;
  className?: string;
}) {
  if (value == null || Number.isNaN(value)) {
    return <span className={cn("text-muted-foreground", className)}>-</span>;
  }

  const formatted = new Intl.NumberFormat(locale, options).format(value);

  return <span className={className}>{formatted}</span>;
}

DataTableCellNumber.displayName = "DataTableCellNumber";
