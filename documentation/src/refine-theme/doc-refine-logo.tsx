import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";
import { RefineLogoXmas } from "./icons/refine-logo-xmas";

interface Props {
  className?: string;
}

export const DocRefineLogo = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center justify-start",
        "gap-2",
        "no-underline",
        className,
      )}
    >
      <Link
        to="/"
        className={clsx(
          "no-underline",
          "flex items-center gap-2",
          "hover:text-white",
        )}
        onContextMenu={openFigma}
      >
        <RefineLogoXmas className="text-gray-900 dark:text-gray-0" />
      </Link>
      <span
        className={clsx(
          "block",
          "h-6",
          "w-px",
          "mx-1",
          "bg-zinc-200 dark:bg-zinc-600",
        )}
      />
      <Link to="/docs" className={clsx("no-underline")}>
        <span
          className={clsx(
            "block",
            "text-zinc-900 dark:text-white",
            "text-base font-normal",
            "tracking-[-0.007rem]",
          )}
        >
          Documentation
        </span>
      </Link>
    </div>
  );
};
