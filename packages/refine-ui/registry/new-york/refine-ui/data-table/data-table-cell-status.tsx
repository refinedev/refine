"use client";

import { Badge } from "@/registry/new-york/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function DataTableCellStatus({
  value,
  variants,
  className,
}: {
  value: string;
  variants?: Record<string, BadgeVariant>;
  className?: string;
}) {
  return (
    <Badge variant={variants?.[value] ?? "default"} className={cn(className)}>
      {value}
    </Badge>
  );
}

DataTableCellStatus.displayName = "DataTableCellStatus";
