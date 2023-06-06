import React, { useMemo } from "react";
import clsx from "clsx";

import { useGithubContext } from "@site/src/context/GithubContext";
import { HeaderGithubIcon } from "../icons/header-github";

export const GitHubStar: React.FC = () => {
    const { starCount, loading } = useGithubContext();

    const formattedStarCount = useMemo(() => {
        if (loading || !starCount) return "";

        return new Intl.NumberFormat("en", {
            notation: "compact",
        }).format(starCount);
    }, [starCount, loading]);

    return (
        <div className="flex items-center">
            <HeaderGithubIcon />
            <span className={clsx("ml-2", "text-sm font-medium text-white")}>
                {formattedStarCount}
            </span>
        </div>
    );
};
