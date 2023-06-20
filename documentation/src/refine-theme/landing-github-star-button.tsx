import React from "react";
import clsx from "clsx";
import { useCommunityNumberContext } from "../context/CommunityNumber";
import { GithubIcon } from "./icons/github";
import { Spinner } from "./spinner";

export const LandingGithubStarButton = () => {
    const { loading, githubStarCount } = useCommunityNumberContext();

    const short = `${Math.floor((githubStarCount ?? 0) / 1000)}k`;

    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noreferrer"
            className={clsx(
                "text-base",
                "text-gray-0",
                "flex items-center gap-2.5",
                "hover:no-underline",
                "hover:text-gray-0",
                "transition-colors",
                "duration-200",
                "ease-in-out",
            )}
        >
            <GithubIcon className={clsx("h-4 w-4")} />
            <div className={clsx("flex items-center", "min-w-8 h-6")}>
                {loading ? (
                    <Spinner
                        className={clsx("h-5 w-5")}
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
