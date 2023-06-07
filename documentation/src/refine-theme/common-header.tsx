import React, { useEffect, useState } from "react";
import SearchBar from "@site/src/theme/SearchBar";
import clsx from "clsx";

import { HeaderDiscordIcon } from "./icons/header-discord";
import { RefineLogoIcon } from "./icons/refine-logo";
import { HamburgerIcon } from "./icons/hamburger";

import { GitHubStar } from "./common-header/github-star";
import { MobileMenuModal } from "./common-header/mobile-menu-model";
import { Menu } from "./common-header/menu";
import { DocSearchButton } from "./doc-search-button";
import { CommonThemeToggle } from "./common-theme-toggle";

export const CommonHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sticky, setSticky] = useState(false);

    const isSticky = () => {
        const scrollTop = window.scrollY;
        setSticky(scrollTop >= 150);
    };

    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    });

    return (
        <div
            className={clsx(
                "dark:bg-gray-800 dark:border-b dark:border-gray-700",
                " bg-gray-50 border-b border-gray-100",
                "px-4 header-md:px-8",
                !sticky && "py-4 header-md:py-9",
                sticky && "py-4 header-md:py-2 sticky top-0 z-10",
            )}
        >
            <div className={clsx("max-w-[1440px]", "mx-auto")}>
                <div className="flex items-center justify-between">
                    <div className="header-md:w-[260px]">
                        <RefineLogoIcon className="dark:text-gray-0 text-gray-900" />
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
                            <HeaderDiscordIcon className="text-gray-500 dark:text-gray-400" />
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
