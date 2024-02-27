import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";

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
        className={clsx("no-underline", "flex items-center gap-2")}
        onContextMenu={openFigma}
      >
        <Logo className="text-refine-cyan dark:text-refine-cyan-alt" />
        <span
          className={clsx(
            "text-gray-1000 dark:text-gray-0",
            "text-base",
            "font-semibold",
          )}
        >
          Refine
        </span>
      </Link>
      <span
        className={clsx(
          "block",
          "h-6",
          "w-px",
          "mx-1",
          "bg-gray-300 dark:bg-gray-600",
        )}
      />
      <Link to="/docs" className={clsx("no-underline")}>
        <span
          className={clsx(
            "text-gray-1000 dark:text-gray-0",
            "text-base font-normal",
          )}
        >
          Documentation
        </span>
      </Link>
    </div>
  );
};

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <g fill="currentColor">
      <path
        fillRule="evenodd"
        d="M13.789.422a4 4 0 0 0-3.578 0l-8 4A4 4 0 0 0 0 8v8a4 4 0 0 0 2.211 3.578l8 4a4 4 0 0 0 3.578 0l8-4A4 4 0 0 0 24 16V8a4 4 0 0 0-2.211-3.578l-8-4ZM8 8a4 4 0 1 1 8 0v8a4 4 0 0 1-8 0V8Z"
        clipRule="evenodd"
      />
      <path d="M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </g>
  </svg>
);
