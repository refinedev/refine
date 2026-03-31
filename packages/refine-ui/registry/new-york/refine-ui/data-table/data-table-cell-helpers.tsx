"use client";

import { cn } from "@/lib/utils";

export function DataTableHeaderLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", "items-center", "gap-1", className)}>
      {children}
    </div>
  );
}

export function DataTableCellTruncate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("truncate", className)}>{children}</div>;
}

export function DataTableCellBadges({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", "flex-wrap", "gap-1", className)}>
      {children}
    </div>
  );
}

export function DataTableCellActions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex", "items-center", "justify-center", className)}>
      {children}
    </div>
  );
}

DataTableHeaderLabel.displayName = "DataTableHeaderLabel";
DataTableCellTruncate.displayName = "DataTableCellTruncate";
DataTableCellBadges.displayName = "DataTableCellBadges";
DataTableCellActions.displayName = "DataTableCellActions";
