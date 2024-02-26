import React from "react";
import { GithubIcon } from "./icons/github";
import clsx from "clsx";

type Props = {
  path: string;
};

export const CommonShowSourcePrompt = ({ path }: Props) => {
  return (
    <div
      className={clsx(
        "refine-wider-container",
        "py-2",
        "px-2",
        "text-base",
        "font-sans",
        "flex items-center",
        "gap-2",
        "rounded-lg",
        "dark:bg-gray-700",
        "bg-gray-100",
        "mb-6",
      )}
    >
      <GithubIcon className="ml-1.5 w-5 h-5 text-gray-800 dark:text-gray-100" />
      <a
        href={path}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "text-base",
          "leading-8",
          "text-refine-react-light-link dark:text-refine-react-dark-link",
        )}
      >
        <span>View Source Code</span>
      </a>
    </div>
  );
};
