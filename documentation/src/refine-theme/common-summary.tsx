import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const CommonSummary = ({ children, className, ...props }) => {
  return (
    <summary
      className={clsx(
        "bg-gray-100 dark:bg-gray-700",
        "!p-2",
        "flex items-center",
        "gap-2",
        "before:hidden",
        "-mb-px",
        "border-b border-b-gray-300 dark:border-b-gray-700",
      )}
      {...props}
    >
      <div className={clsx("w-6 h-6", "flex items-center justify-center")}>
        <TriangleDownIcon
          className={clsx(
            "refine-details-triangle",
            "text-gray-500",
            "w-4 h-4",
          )}
        />
      </div>
      <span className="text-gray-800 dark:text-gray-100 text-base">
        {children}
      </span>
    </summary>
  );
};

export default CommonSummary;
