"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DataTableLoadingOverlay({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 z-2 flex items-center justify-center",
        "bg-background/60",
        "rounded-[inherit]",
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

DataTableLoadingOverlay.displayName = "DataTableLoadingOverlay";
