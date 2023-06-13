import React, { useState } from "react";
import SearchBar from "@site/src/theme/SearchBar";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import { HeaderDiscordIcon } from "./icons/header-discord";
import { RefineLogoIcon } from "./icons/refine-logo";
import { HamburgerIcon } from "./icons/hamburger";

import { GitHubStar } from "./common-header/github-star";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import { Menu } from "./common-header/menu";
import { DocSearchButton } from "./doc-search-button";
import { CommonThemeToggle } from "./common-theme-toggle";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
    hasSticky?: boolean;
    trackProgress?: boolean;
};

export const CommonHeader = ({ hasSticky, trackProgress }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log("contentRef");
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
                    "bg-gray-50",
                    "dark:bg-gray-800",
                )}
            />
            <div
                className={clsx(
                    "bg-gray-50 dark:bg-gray-800",
                    "px-4 header-md:px-8",
                    "py-3",
                    hasSticky && "sticky top-0 z-10",
                )}
            >
                <div className={clsx("max-w-[1440px]", "mx-auto")}>
                    <div className="flex items-center justify-between">
                        <div className="header-md:w-[260px]">
                            <Link to="/">
                                <RefineLogoIcon className="dark:text-gray-0 text-gray-900" />
                            </Link>
                        </div>
                        <div className="hidden header-md:flex gap-8">
                            <Menu />
                        </div>
                        <div className="hidden header-md:flex items-center justify-end gap-8">
                            <SearchBar
                                CustomButton={(props) => (
                                    <DocSearchButton
                                        {...props}
                                        placeholder="Search"
                                        className="min-w-[144px]"
                                    />
                                )}
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
                <MobileMenuModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>
            <div
                className={clsx(
                    "h-2 header-sm:h-4 header-md:h-6",
                    "w-full",
                    "bg-gray-50",
                    "dark:bg-gray-800",
                )}
            />
            <div
                className={clsx(
                    "w-full",
                    hasSticky && [
                        "z-0",
                        "sticky",
                        "top-14",
                        "header-md:top-16",
                    ],
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
