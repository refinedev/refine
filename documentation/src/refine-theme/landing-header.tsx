import clsx from "clsx";
import React, { useEffect, useState } from "react";

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

    const [offset, setOffset] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 24) {
                return setOffset(true);
            }

            return setOffset(false);
        };

        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div
                className={clsx("h-2 header-sm:h-4 header-md:h-6", "w-full", {
                    "bg-landing-header-bg": offset,
                    "backdrop-blur-header-blur": offset,
                })}
            />
            <header
                className={clsx(
                    "w-full",
                    {
                        "bg-landing-header-bg": offset,
                        "backdrop-blur-header-blur": offset,
                    },
                    "px-4 header-md:px-8",
                    "py-4",
                    "sticky top-0 z-10",
                )}
            >
                <div className={clsx("max-w-[1264px]", "mx-auto")}>
                    <div className={clsx("flex items-center")}>
                        <div className={clsx("flex items-center", "w-[240px]")}>
                            <Link to="/">
                                <RefineLogoIcon className="text-gray-0 h-6 w-auto" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-end landing-xl:justify-between grow">
                            <div
                                className={clsx("hidden header-md:flex gap-8")}
                            >
                                <Menu isPermanentDark />
                            </div>
                            <div className="hidden header-md:flex items-center justify-end gap-8">
                                <SearchBar
                                    CustomButton={LandingDocSearchButton}
                                />
                                <div className="flex items-center gap-3">
                                    <LandingGithubStarButton />
                                    <Link
                                        to="https://discord.gg/refine"
                                        className={clsx(
                                            "no-underline, hover:text-inherit",
                                        )}
                                    >
                                        <DiscordIcon className="text-gray-0" />
                                    </Link>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="block landing-xl:hidden text-gray-0"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <HamburgerIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <MobileMenuModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </header>
            {offset && (
                <div
                    className={clsx("w-full", "z-[10]", "sticky", "top-[64px]")}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "h-px",
                            "bg-landing-header-border",
                        )}
                    />
                </div>
            )}
            <div
                className={clsx("h-2 header-sm:h-4 header-md:h-6", "w-full", {
                    "bg-landing-header-bg": offset,
                    "backdrop-blur-header-blur": offset,
                })}
            />
        </>
    );
};
