import React from "react";
import clsx from "clsx";
import { useGithubContext } from "../context/GithubContext";
import { GithubIcon } from "./icons/github";
import { Spinner } from "./spinner";

type Props = {
    className?: string;
};

export const CommonGithubStarButton = ({ className }: Props) => {
    const { loading, starCount } = useGithubContext();

    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noreferrer"
            className={clsx(
                "text-base",
                "text-gray-500 dark:text-gray-400",
                "flex gap-2 items-center",
                "no-underline",
                "transition-colors",
                "duration-200",
                "ease-in-out",
                className,
            )}
        >
            <GithubIcon className={clsx("w-6 h-6")} />
            <div className={clsx("flex items-center", "min-w-[80px] h-6")}>
                Star:&nbsp;
                {loading ? (
                    <Spinner
                        className={clsx("w-5 h-5")}
                        wrapperProps={{
                            className: clsx("mx-auto"),
                        }}
                    />
                ) : (
                    <span className={clsx("min-w-10 font-semibold")}>
                        {starCount?.toLocaleString()}
                    </span>
                )}
            </div>
        </a>
    );
};
