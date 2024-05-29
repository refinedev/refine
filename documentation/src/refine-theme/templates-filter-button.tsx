import React, { type FC } from "react";
import clsx from "clsx";
import { FilterIcon } from "./icons/filter";

type Props = {
  className?: string;
  onClick: () => void;
};

export const TemplatesFilterButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "appearance-none",
        "flex",
        "items-center",
        "w-max",
        "gap-2",
        "px-6 py-3",
        "rounded-full",
        "dark:bg-gray-700 bg-gray-200",
        className,
      )}
    >
      <FilterIcon />
      <span className={clsx("dark:text-gray-0 text-gray-900")}>
        Filter Templates
      </span>
    </button>
  );
};
