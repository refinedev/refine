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
import { TopAnnouncement } from "./top-announcement";

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
            <TopAnnouncement />
            <div
                className={clsx(
                    "header-sm:h-4 blog-lg:h-6 h-2",
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
                    "blog-lg:px-8 px-4",
                    "py-3",
                    hasSticky && "sticky top-0 z-10",
                )}
            >
                <div className={clsx("max-w-[1264px]", "mx-auto")}>
                    <div className="flex items-center">
                        <div className={clsx("flex items-center", "w-[220px]")}>
                            <Link to="/">
                                <RefineLogoIcon className="dark:text-gray-0 text-gray-900" />
                            </Link>
                        </div>
                        <div className="blog-lg:justify-between flex grow items-center justify-end">
                            <div className="blog-lg:flex hidden gap-8">
                                <Menu />
                            </div>
                            <div className="blog-lg:flex hidden items-center justify-end gap-8">
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
                                className="blog-lg:hidden block"
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
                    "header-sm:h-4 blog-lg:h-6 h-2",
                    "w-full",
                    "bg-common-header-bg-light",
                    "dark:bg-common-header-bg-dark",
                    "backdrop-blur-header-blur",
                )}
            />
            <div
                className={clsx(
                    "w-full",
                    hasSticky && [
                        "z-[2]",
                        "sticky",
                        "blog-lg:top-[64px] top-[56px]",
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
