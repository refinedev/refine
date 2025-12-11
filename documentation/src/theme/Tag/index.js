import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function Tag({
  permalink,
  label,
  isActive,
  size = "small",
  variant = "default",
}) {
  return (
    <Link
      href={permalink}
      className={clsx(
        "no-underline hover:no-underline",
        "rounded-full",
        size === "small" && "text-xs",
        size === "small" && "py-1",
        size === "small" && "px-3",
        size === "medium" && "text-sm",
        size === "medium" && "py-2",
        size === "medium" && "px-4",
        !isActive && "bg-zinc-100 dark:bg-zinc-700",
        !isActive && "text-zinc-600 dark:text-zinc-400",
        "text-zinc-900 dark:text-zinc-300",
        variant === "default" && "bg-zinc-200 dark:bg-zinc-700",
        variant === "inverted" && "bg-zinc-200 dark:bg-zinc-900",
      )}
    >
      {label}
    </Link>
  );
}
