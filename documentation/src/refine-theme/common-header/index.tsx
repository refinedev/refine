import React, { useState } from "react";
import SearchBar from "@site/src/theme/SearchBar";
import clsx from "clsx";

import { HeaderDiscordIcon } from "../icons/header-discord";
import { RefineLogoIcon } from "../icons/refine-logo";

import { GitHubStar } from "./github-star";
import { HamburgerIcon } from "../icons/hamburger";
import { MobileMenuModal } from "./mobile-menu-model";
import { Menu } from "./menu";

export const CommonHeader = () => {
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
                        <RefineLogoIcon className="text-gray-0" />
                    </div>
                    <div className="hidden header-md:flex gap-8">
                        <Menu />
                    </div>
                    <div className="hidden header-md:flex items-center justify-end gap-8">
                        <SearchBar
                            docSearchButton={{
                                placeholder: "Search",
                            }}
                        />
                        <div className="flex items-center gap-2">
                            <GitHubStar />
                            <HeaderDiscordIcon />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="block header-md:hidden"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <HamburgerIcon />
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
