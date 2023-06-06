import clsx from "clsx";
import React from "react";
import Link from "@docusaurus/Link";
import SearchBar from "@theme/SearchBar";
import { RefineLogoIcon } from "./icons/refine-logo";
// import { DocVersionDropdown } from "./doc-version-dropdown";
import { CommonThemeToggle } from "./common-theme-toggle";
import { CommonGithubStarButton } from "./common-github-star-button";

export const BlogHeader = () => {
    return (
        <div
            className={clsx(
                "z-10",
                "sticky",
                "top-0",
                "dark:bg-gray-800 bg-gray-50",
                "border-b dark:border-gray-700 border-gray-100",
                "py-3 px-6",
            )}
        >
            <div
                className={clsx(
                    "h-[64px]",
                    "max-w-[1644px]",
                    "flex justify-between items-center",
                    "mx-auto",
                )}
            >
                <Link to="/docs">
                    <RefineLogoIcon className="dark:text-gray-0 text-gray-900" />
                </Link>

                <div
                    className={clsx(
                        "flex justify-end",
                        "items-center",
                        "gap-4",
                    )}
                >
                    <SearchBar />
                    <CommonGithubStarButton />
                    <CommonThemeToggle />
                </div>
            </div>
        </div>
    );
};
