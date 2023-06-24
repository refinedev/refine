import React, { useState } from "react";
import SearchBar from "@site/src/theme/SearchBar";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";

import { HeaderDiscordIcon } from "./icons/header-discord";
import { RefineLogoIcon } from "./icons/refine-logo";
import { HamburgerIcon } from "./icons/hamburger";

import { GitHubStar } from "./common-header/github-star";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import { Menu } from "./common-header/menu";
import { CommonThemeToggle } from "./common-theme-toggle";
import { CommonDocSearchButton } from "./common-doc-search-button";

type Props = {
    hasSticky?: boolean;
    trackProgress?: boolean;
};

export const CommonHeader = ({ hasSticky, trackProgress }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    const progressPercentage = useTransform(
        scrollYProgress,
        [0.03, 0.9],
        ["0%", "100%"],
    );

    return (
        <>
            <div
                className={clsx(
                    "h-2 header-sm:h-4 header-md:h-6",
                    "w-full",
                    "bg-common-header-bg-light",
                    "dark:bg-common-header-bg-dark",
                    "backdrop-blur-header-blur",
                )}
            />
            <div
                className={clsx(
                    "bg-common-header-bg-light",
                    "dark:bg-common-header-bg-dark",
                    "backdrop-blur-header-blur",
                    "px-4 header-md:px-8",
                    "py-3",
                    hasSticky && "sticky top-0 z-10",
                )}
            >
                <div className={clsx("max-w-[1264px]", "mx-auto")}>
                    <div className="flex items-center">
                        <div className={clsx("flex items-center", "w-[240px]")}>
                            <Link to="/">
                                <RefineLogoIcon className="dark:text-gray-0 text-gray-900" />
                            </Link>
                        </div>
                        <div className="flex items-center justify-end landing-xl:justify-between grow">
                            <div className="hidden header-md:flex gap-8">
                                <Menu />
                            </div>
                            <div className="hidden header-md:flex items-center justify-end gap-8">
                                <SearchBar
                                    CustomButton={CommonDocSearchButton}
                                />
                                <div className="flex items-center gap-3">
                                    <GitHubStar />
                                    <Link
                                        to="https://discord.gg/refine"
                                        className={clsx(
                                            "no-underline, hover:text-inherit",
                                        )}
                                    >
                                        <HeaderDiscordIcon className="text-gray-500 dark:text-gray-400" />
                                    </Link>
                                    <CommonThemeToggle />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="block header-md:hidden"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <HamburgerIcon className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
                <MobileMenuModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <div
                className={clsx(
                    "h-2 header-sm:h-4 header-md:h-6",
                    "w-full",
                    "bg-common-header-bg-light",
                    "dark:bg-common-header-bg-dark",
                    "backdrop-blur-header-blur",
                )}
            />
            <div
                className={clsx(
                    "w-full",
                    hasSticky && ["z-0", "sticky", "top-[64px]"],
                )}
            >
                <div
                    className={clsx(
                        "w-full",
                        "h-px",
                        "bg-gray-100 dark:bg-gray-700",
                    )}
                />
                {trackProgress && (
                    <div className={clsx("w-full", "h-0.5")}>
                        <motion.div
                            className={clsx("h-full", "bg-refine-blue")}
                            style={{ width: progressPercentage }}
                        />
                    </div>
                )}
            </div>
        </>
    );
};
