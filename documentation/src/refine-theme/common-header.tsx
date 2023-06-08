import React, { useEffect, useState, useRef } from "react";
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

export const CommonHeader = ({ hasSticky }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const header = useRef(null);

    useEffect(() => {
        const fixedTop = header?.current.offsetTop;
        const windowScrollListener = () => {
            if (window.pageYOffset > fixedTop) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener("scroll", windowScrollListener);
    }, []);

    return (
        <div
            ref={header}
            className={clsx(
                "dark:bg-gray-800 dark:border-b dark:border-gray-700",
                " bg-gray-50 border-b border-gray-100",
                "px-4 header-md:px-8",
                !hasSticky && "py-4 header-md:py-9",
                hasSticky && !sticky && "py-4 header-md:py-9",
                hasSticky && sticky && "py-6 header-md:py-3 sticky top-0 z-10",
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
    );
};
