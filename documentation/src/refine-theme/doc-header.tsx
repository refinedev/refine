import React, { useState } from "react";
import clsx from "clsx";
import SearchBar from "@theme/SearchBar";
import { DocVersionDropdown } from "./doc-version-dropdown";
import { CommonThemeToggle } from "./common-theme-toggle";
import { CommonHomeButton } from "./common-home-button";
import { CommonGithubStarButton } from "./common-github-star-button";
import { DocSidebarModal } from "./doc-sidebar-modal";
import { RefineLogo } from "./common-refine-logo";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { DocSearchButton } from "./doc-search-button";

export const HEADER_HEIGHT = 67;

const Divider = () => {
    return (
        <div
            className={clsx(
                "flex-shrink-0",
                "h-6",
                "w-px",
                "mx-4",
                "bg-gray-200 dark:bg-gray-600",
            )}
        />
    );
};

const Desktop = () => {
    return (
        <div
            className={clsx(
                "w-full",
                "hidden lg:flex items-center",
                "mx-auto",
                "max-w-[1644px]",
            )}
        >
            <RefineLogo
                className={clsx("lg:min-w-[256px]")}
                title="Documentation"
            />
            <div className={clsx("w-full", "flex items-center justify-center")}>
                <div
                    className={clsx(
                        "w-full max-w-screen-content",
                        "hidden xl:flex items-center justify-start",
                    )}
                >
                    <SearchBar />
                </div>
            </div>

            <div className={clsx("w-[256px] h-full relative")}>
                <div
                    className={clsx(
                        "abolute right-0 top-0",
                        "flex justify-end",
                        "items-center",
                    )}
                >
                    <div className={clsx("xl:hidden flex")}>
                        <SearchBar
                            CustomButton={(props) => (
                                <DocSearchButton {...props} iconOnly />
                            )}
                        />
                    </div>
                    <Divider />
                    <DocVersionDropdown />
                    <Divider />
                    <CommonGithubStarButton />
                    <Divider />
                    <CommonHomeButton />
                    <Divider />
                    <CommonThemeToggle />
                </div>
            </div>
        </div>
    );
};

export const Mobile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div
            className={clsx(
                "w-full",
                "flex lg:hidden items-center justify-between",
            )}
        >
            <RefineLogo title="Documentation" />
            <div className={clsx("flex items-center gap-4")}>
                <SearchBar CustomButton={() => <DocSearchButton iconOnly />} />
                <CommonThemeToggle />
                <CommonHamburgerIcon
                    onClick={() => setIsSidebarOpen(true)}
                    active={isSidebarOpen}
                />
            </div>
            <DocSidebarModal
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    );
};

export const DocHeader = () => {
    return (
        <div
            className={clsx(
                "flex items-center",
                "h-12 sm:h-16",
                "z-10",
                "sticky",
                "top-0",
                "py-2 sm:py-3 px-4 sm:px-6",
                "bg-gray-50 dark:bg-gray-800",
                "border-b border-gray-100 dark:border-gray-700",
            )}
        >
            <Desktop />
            <Mobile />
        </div>
    );
};
