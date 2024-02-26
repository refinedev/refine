import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

import { useCommunityStatsContext } from "@site/src/context/CommunityStats";
import { HeaderGithubIcon } from "../icons/header-github";
import { Spinner } from "../spinner";

type GitHubStarProps = {
  isPermanentDark?: boolean;
};

export const GitHubStar: React.FC<GitHubStarProps> = ({ isPermanentDark }) => {
  const { githubStarCountText, loading } = useCommunityStatsContext();

  return (
    <Link
      className="flex items-center no-underline"
      to="https://github.com/refinedev/refine"
    >
      <HeaderGithubIcon
        className={clsx(
          "text-gray-500 dark:gray-400",
          isPermanentDark && "!text-white",
        )}
      />
      <div
        className={clsx(
          "flex items-center",
          "w-10 h-6",
          "ml-2",
          "text-sm font-medium ",
          "text-gray-500 dark:text-gray-400",
          isPermanentDark && "!text-white",
        )}
      >
        {loading ? (
          <Spinner
            className={clsx("w-5 h-5")}
            wrapperProps={{
              className: clsx("mx-auto"),
            }}
          />
        ) : (
          <span className="tabular-nums">{githubStarCountText}</span>
        )}
      </div>
    </Link>
  );
};
