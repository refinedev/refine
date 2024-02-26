import clsx from "clsx";
import React from "react";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { GithubIcon } from "./icons/github";
import { Spinner } from "./spinner";

type Props = {
  className?: string;
};

export const CommonGithubStarButton = ({ className }: Props) => {
  const { githubStarCountText, loading } = useCommunityStatsContext();

  return (
    <a
      href="https://github.com/refinedev/refine"
      target="_blank"
      rel="noreferrer"
      className={clsx(
        "text-sm",
        "text-gray-500 dark:text-gray-400",
        "rounded-[32px]",
        "border border-solid border-gray-300 dark:border-gray-700",
        "flex gap-2 items-center",
        "py-2 pl-2.5 pr-4",
        "no-underline",
        className,
      )}
    >
      <GithubIcon className={clsx("w-5 h-5")} />
      <div className={clsx("flex items-center", "min-w-[76px] h-6")}>
        Star:&nbsp;
        {loading ? (
          <Spinner
            className={clsx("w-5 h-5")}
            wrapperProps={{
              className: clsx("mx-auto"),
            }}
          />
        ) : (
          <span
            className={clsx("tabular-nums text-gray-800 dark:text-gray-100")}
          >
            {githubStarCountText}
          </span>
        )}
      </div>
    </a>
  );
};
