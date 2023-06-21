import clsx from "clsx";
import React from "react";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { GithubIcon } from "./icons/github";
import { Spinner } from "./spinner";

export const LandingGithubStarButton = () => {
    const { loading, githubStarCount } = useCommunityStatsContext();

    const short = `${(githubStarCount / 1000).toFixed(1)}k`;

    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noreferrer"
            className={clsx(
                "text-base",
                "text-gray-0",
                "flex gap-2.5 items-center",
                "hover:no-underline",
                "hover:text-gray-0",
                "transition-colors",
                "duration-200",
                "ease-in-out",
            )}
        >
            <GithubIcon className={clsx("w-4 h-4")} />
            <div className={clsx("flex items-center", "min-w-8 h-6")}>
                {loading ? (
                    <Spinner
                        className={clsx("w-5 h-5")}
                        wrapperProps={{
                            className: clsx("mx-auto"),
                        }}
                    />
                ) : (
                    <span>{short}</span>
                )}
            </div>
        </a>
    );
};
