import React from "react";
import clsx from "clsx";
import { useCommunityNumberContext } from "../context/CommunityNumber";
import { GithubIcon } from "./icons/github";
import { Spinner } from "./spinner";

type Props = {
    className?: string;
};

export const CommonGithubStarButton = ({ className }: Props) => {
    const { loading, githubStarCount } = useCommunityNumberContext();

    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noreferrer"
            className={clsx(
                "text-base",
                "text-gray-500 dark:text-gray-400",
                "flex items-center gap-2",
                "no-underline",
                "transition-colors",
                "duration-200",
                "ease-in-out",
                className,
            )}
        >
            <GithubIcon className={clsx("h-6 w-6")} />
            <div className={clsx("flex items-center", "h-6 min-w-[80px]")}>
                Star:&nbsp;
                {loading ? (
                    <Spinner
                        className={clsx("h-5 w-5")}
                        wrapperProps={{
                            className: clsx("mx-auto"),
                        }}
                    />
                ) : (
                    <span className={clsx("min-w-10 font-semibold")}>
                        {githubStarCount?.toLocaleString()}
                    </span>
                )}
            </div>
        </a>
    );
};
