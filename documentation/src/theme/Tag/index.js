import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export default function Tag({ permalink, label, isActive }) {
  return (
    <Link
      href={permalink}
      className={clsx(
        "no-underline hover:no-underline",
        "text-xs",
        "rounded-full",
        "py-1",
        "px-3",
        !isActive && "bg-gray-100 dark:bg-gray-700",
        !isActive && "text-gray-600 dark:text-gray-400",
        "text-refine-react-8 dark:text-refine-react-3",
        "bg-refine-react-3 dark:bg-refine-react-7",
      )}
    >
      {label}
    </Link>
  );
}
