import React from "react";
import clsx from "clsx";

type Props = { version: string };

export const DocVersionBadge = ({ version }: Props) => {
  return (
    <div
      className={clsx(
        "text-xs",
        "py-[7px] px-4",
        "rounded-[32px]",
        "font-jetBrains-mono",
        "border border-solid",
        "border-gray-300 dark:border-gray-700",
        "text-gray-500 dark:text-gray-400",
      )}
    >
      Version: {version}
    </div>
  );
};
