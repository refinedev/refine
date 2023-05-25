import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import SearchBar from "@theme/SearchBar";
import { RefineLogoIcon } from "./icons/refine-logo";

import {
    useVersions,
    useActiveDocContext,
} from "@docusaurus/plugin-content-docs/client";
import { DocVersionDropdown } from "./doc-version-dropdown";
import { CommonThemeToggle } from "./common-theme-toggle";
import { CommonFeedbackButton } from "./common-feedback-button";
import { CommonHomeButton } from "./common-home-button";

export const HEADER_HEIGHT = 67;

export const DocHeader = () => {
    const x = useActiveDocContext();

    return (
        <div
            className={clsx(
                "z-10",
                "sticky",
                "top-0",
                "py-3 px-6",
                "bg-gray-800",
                "border-b border-gray-700",
                "flex",
                "justify-between",
                "items-center",
            )}
        >
            <div
                className={clsx(
                    "max-w-[290px]",
                    "w-full",
                    "flex justify-start",
                )}
            >
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
                        Docs
                    </span>
                </Link>
            </div>
            <div
                className={clsx(
                    "max-w-screen-content",
                    "w-full",
                    "flex",
                    "items-center justify-between",
                )}
            >
                <SearchBar />
                <DocVersionDropdown />
            </div>
            <div
                className={clsx(
                    "max-w-[290px]",
                    "w-full",
                    "flex justify-end",
                    "items-center",
                    "gap-4",
                )}
            >
                <CommonHomeButton />
                <CommonThemeToggle />
                <CommonFeedbackButton />
            </div>
        </div>
    );
};
