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
        !isActive && "bg-gray-100 dark:bg-gray-700",
        !isActive && "text-gray-600 dark:text-gray-400",
        "text-refine-react-8 dark:text-refine-react-3",
        variant === "default" && "bg-refine-react-3 dark:bg-refine-react-7",
        variant === "inverted" && "bg-refine-react-3 dark:bg-refine-react-8",
      )}
    >
      {label}
    </Link>
  );
}
