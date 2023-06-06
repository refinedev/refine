import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import SearchBar from "@theme/SearchBar";
import { RefineLogoIcon } from "./icons/refine-logo";

import { DocVersionDropdown } from "./doc-version-dropdown";
import { CommonThemeToggle } from "./common-theme-toggle";
import { CommonHomeButton } from "./common-home-button";
import { CommonGithubStarButton } from "./common-github-star-button";

export const HEADER_HEIGHT = 67;

export const DocHeader = () => {
    return (
        <div
            className={clsx(
                "h-16",
                "z-10",
                "sticky",
                "top-0",
                "bg-gray-800",
                "border-b dark:border-gray-700 border-gray-200",
                "py-3 px-6",
            )}
        >
            <div
                className={clsx(
                    "max-w-[1644px]",
                    "flex justify-between items-center",
                    "mx-auto",
                )}
            >
                <div className={clsx("flex", "items-center")}>
                    <Link
                        to="/docs"
                        className={clsx("flex", "justify-center", "gap-3")}
                    >
                        <RefineLogoIcon className="text-gray-0" />
                        <span
                            className={clsx(
                                "text-base leading-none text-gray-0 font-normal",
                                "mt-1.5",
                            )}
                        >
                            Documentation
                        </span>
                    </Link>
                </div>
                <div className={clsx("flex items-center justify-between")}>
                    <div
                        className={clsx(
                            "max-w-screen-content",

                            "flex",
                            "items-center justify-between",
                        )}
                    >
                        <SearchBar />
                    </div>
                </div>

                <div className={clsx("flex justify-end", "items-center")}>
                    <DocVersionDropdown />
                    <div
                        className={clsx("h-6", "w-px", "mx-4", "bg-gray-600")}
                    />
                    <CommonGithubStarButton />
                    <div
                        className={clsx("h-6", "w-px", "mx-4", "bg-gray-600")}
                    />
                    <CommonHomeButton />
                    <div
                        className={clsx("h-6", "w-px", "mx-4", "bg-gray-600")}
                    />
                    <CommonThemeToggle />
                </div>
            </div>
        </div>
    );
};
