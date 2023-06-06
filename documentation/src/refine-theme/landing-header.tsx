import clsx from "clsx";
import React from "react";

import SearchBar from "@theme/SearchBar";
import { LandingDocSearchButton } from "./landing-doc-search-button";
import { LandingGithubStarButton } from "./landing-github-star-button";
import { DiscordIcon } from "./icons/discord";
import { RefineLogoIcon } from "./icons/refine-logo";
import Link from "@docusaurus/Link";

export const LandingHeader = () => {
    return (
        <header
            className={clsx(
                "w-full",
                "max-w-screen-landing-2xl",
                "px-4",
                "landing-sm:px-6",
                "landing-lg:px-8",
                "landing-xl:px-12",
                "landing-2xl:px-20",
                "py-5",
                "landing-md:py-9",
                "landing-xl:py-11",
                "flex items-center justify-between",
            )}
        >
            <div
                className={clsx(
                    "flex",
                    "items-center justify-start",
                    "landing-xl:w-[264px]",
                )}
            >
                <Link
                    to="/"
                    className={clsx("flex", "justify-center", "gap-3")}
                >
                    <RefineLogoIcon className="text-gray-0 h-6 w-auto" />
                </Link>
            </div>
            <div>...</div>
            <div
                className={clsx(
                    "flex items-center justify-end",
                    "gap-6",
                    "landing-xl:w-[264px]",
                )}
            >
                <SearchBar CustomButton={LandingDocSearchButton} />
                <LandingGithubStarButton />
                <a
                    href="https://discord.gg/refine"
                    target="_blank"
                    rel="noreferrer"
                    className={clsx(
                        "w-6 h-6",
                        "flex",
                        "items-center justify-center",
                        "text-gray-0",
                        "focus:no-underline",
                        "hover:text-refine-link",
                    )}
                >
                    <DiscordIcon />
                </a>
            </div>
        </header>
    );
};
