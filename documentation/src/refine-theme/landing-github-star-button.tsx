import React from "react";
import clsx from "clsx";
import { useGithubContext } from "../context/GithubContext";
import { GithubIcon } from "../components/landing/icons";
import { Spinner } from "./spinner";

export const LandingGithubStarButton = () => {
    const { loading, starCount } = useGithubContext();

    const short = `${Math.floor((starCount ?? 0) / 1000)}k`;

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
