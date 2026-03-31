"use client";

import { cn } from "@/lib/utils";

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
  ["second", 1000],
];

function formatRelative(date: Date, locale?: string): string {
  const diff = date.getTime() - Date.now();
  const absDiff = Math.abs(diff);

  for (const [unit, ms] of RELATIVE_UNITS) {
    if (absDiff >= ms) {
      const value = Math.round(diff / ms);
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
        value,
        unit,
      );
    }
  }

  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    0,
    "second",
  );
}

export function DataTableCellDate({
  value,
  format = "absolute",
  locale,
  className,
}: {
  value: string | number | Date;
  format?: "relative" | "absolute" | ((date: Date) => string);
  locale?: string;
  className?: string;
}) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return <span className={cn("text-muted-foreground", className)}>-</span>;
  }

  let formatted: string;

  if (typeof format === "function") {
    formatted = format(date);
  } else if (format === "relative") {
    formatted = formatRelative(date, locale);
  } else {
    formatted = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  return (
    <span className={className} title={date.toISOString()}>
      {formatted}
    </span>
  );
}

DataTableCellDate.displayName = "DataTableCellDate";
