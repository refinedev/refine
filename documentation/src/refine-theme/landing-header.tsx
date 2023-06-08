import React, { useState } from "react";
import SearchBar from "@site/src/theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { HeaderDiscordIcon } from "./icons/header-discord";
import { RefineLogoIcon } from "./icons/refine-logo";
import { HamburgerIcon } from "./icons/hamburger";

import { GitHubStar } from "./common-header/github-star";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import { Menu } from "./common-header/menu";
import { DocSearchButton } from "./doc-search-button";

export const LandingHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className={clsx(
                    "max-w-[1440px]",
                    "mx-auto",
                    "px-4 header-md:px-8 py-4 header-md:py-9",
                )}
            >
                <div className="flex items-center justify-between">
                    <div className="header-md:w-[260px]">
                        <Link to="/">
                            <RefineLogoIcon className="text-gray-0" />
                        </Link>
                    </div>
                    <div className="hidden header-md:flex gap-8">
                        <Menu isPermanentDark />
                    </div>
                    <div className="hidden header-md:flex items-center justify-end gap-8">
                        <SearchBar
                            CustomButton={(props) => (
                                <DocSearchButton
                                    {...props}
                                    placeholder="Search"
                                    className="min-w-[144px]"
                                    isPermanentDark
                                />
                            )}
                        />
                        <div className="flex items-center gap-2">
                            <GitHubStar isPermanentDark />
                            <Link
                                to="https://discord.gg/refine"
                                className={clsx(
                                    "no-underline, hover:text-inherit",
                                )}
                            >
                                <HeaderDiscordIcon className="text-white" />
                            </Link>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="block header-md:hidden"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <HamburgerIcon className="text-white" />
                    </button>
                </div>
            </div>
            <MobileMenuModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
