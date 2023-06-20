import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useMemo } from "react";

import { useCommunityNumberContext } from "@site/src/context/CommunityNumber";
import { HeaderGithubIcon } from "../icons/header-github";

type GitHubStarProps = {
    isPermanentDark?: boolean;
};

export const GitHubStar: React.FC<GitHubStarProps> = ({ isPermanentDark }) => {
    const { githubStarCount, loading } = useCommunityNumberContext();

    const formattedStarCount = useMemo(() => {
        if (loading || !githubStarCount) return <div className="w-5 h-5" />;

        return new Intl.NumberFormat("en", {
            notation: "compact",
        }).format(githubStarCount);
    }, [githubStarCount, loading]);

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
            <span
                className={clsx(
                    "ml-2",
                    "text-sm font-medium ",
                    "text-gray-500 dark:text-gray-400",
                    isPermanentDark && "!text-white",
                )}
            >
                {formattedStarCount}
            </span>
        </Link>
    );
};
