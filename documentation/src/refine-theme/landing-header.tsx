import clsx from "clsx";
import React from "react";

import SearchBar from "@theme/SearchBar";
import Link from "@docusaurus/Link";

import { Menu } from "./common-header/menu";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";

import { LandingDocSearchButton } from "./landing-doc-search-button";
import { LandingGithubStarButton } from "./landing-github-star-button";

import { DiscordIcon } from "./icons/discord";
import { HamburgerIcon } from "./icons/hamburger";
import { RefineLogoIcon } from "./icons/refine-logo";

export const LandingHeader = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <header
            className={clsx(
                "w-full",
                "max-w-screen-landing-2xl",
                "px-4",
                "landing-sm:px-6",
                "landing-md:px-8",
                "landing-xl:px-12",
                "landing-2xl:px-[88px]",
                "py-5",
                "landing-md:py-9",
                "landing-xl:py-11",
                "flex items-center justify-between",
                "mx-auto",
            )}
        >
            <div
                className={clsx(
                    "flex",
                    "items-center justify-start",
                    "landing-xl:w-[264px]",
                )}
            >
                <Link to="/" className={clsx("flex", "justify-center")}>
                    <RefineLogoIcon className="text-gray-0 h-6 w-auto" />
                </Link>
            </div>
            <div className={clsx("hidden landing-xl:flex", "gap-8")}>
                <Menu />
            </div>
            <div
                className={clsx(
                    "flex items-center justify-end",
                    "gap-6",
                    "landing-xl:w-[264px]",
                )}
            >
                <div
                    className={clsx(
                        "hidden landing-xl:flex",
                        "items-center gap-6",
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
                <button
                    type="button"
                    className="block landing-xl:hidden text-gray-0"
                    onClick={() => setIsModalOpen(true)}
                >
                    <HamburgerIcon />
                </button>
            </div>
            <MobileMenuModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </header>
    );
};
