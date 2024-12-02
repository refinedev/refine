import clsx from "clsx";
import React from "react";
import { GithubIcon } from "./icons/github";

export const SourceCodeBadge = ({ path }: { path?: string }) => {
  const sourcePath = path.startsWith("https://")
    ? path
    : `https://github.com/refinedev/refine/blob/main${
        path.startsWith("/") ? "" : "/"
      }${path}`;

  return (
    <a
      href={sourcePath}
      target="_blank"
      rel="noreferrer noopener"
      className={clsx(
        "text-xs",
        "font-mono",
        "text-gray-0",
        "bg-refine-purple",
        "py-2 pl-2 pr-4",
        "rounded-[32px]",
        "flex gap-2 items-center",
        "hover:no-underline hover:text-gray-0",
      )}
    >
      <GithubIcon className="w-4 h-4" />
      <span>Source Code</span>
    </a>
  );
};
