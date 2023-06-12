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
                "py-2",
                "px-2",
                "text-base",
                "text-gray-300",
                "font-sans",
                "flex items-center",
                "gap-2",
                "rounded-lg",
                "bg-gray-700",
                "mb-6",
            )}
        >
            <div
                className={clsx(
                    "w-8 h-8",
                    "rounded",
                    "bg-gray-800 bg-opacity-50",
                    "flex items-center justify-center",
                )}
            >
                <GithubIcon className="text-gray-0 w-5 h-5" />
            </div>
            <a
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                    "text-refine-link-light dark:text-refine-link-dark",
                    "underline",
                )}
            >
                <span>View Source Code</span>
            </a>
        </div>
    );
};
