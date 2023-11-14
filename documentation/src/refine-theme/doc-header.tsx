import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import React, { useState } from "react";
import { CommonGithubStarButton } from "./common-github-star-button";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { CommonHomeButton } from "./common-home-button";
import { RefineLogo } from "./common-refine-logo";
import { CommonThemeToggle } from "./common-theme-toggle";
import { DocSearchButton } from "./doc-search-button";
import { DocSidebarModal } from "./doc-sidebar-modal";
import { DocVersionDropdown } from "./doc-version-dropdown";
import { TopAnnouncement } from "./top-announcement";

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
                // "max-w-[1644px]",
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
                            CustomButton={React.forwardRef<
                                HTMLButtonElement,
                                React.PropsWithChildren<{}>
                            >(function CustomButton(props, ref) {
                                return (
                                    <DocSearchButton
                                        ref={ref}
                                        {...props}
                                        iconOnly
                                    />
                                );
                            })}
                        />
                    </div>
                    <DocVersionDropdown />
                    <Divider />
                    <CommonGithubStarButton />
                    <Divider />
                    <CommonHomeButton />
                    <Divider />
                    <CommonThemeToggle
                        className={clsx("scale-75", "sm:scale-100")}
                    />
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
                <SearchBar
                    CustomButton={React.forwardRef<
                        HTMLButtonElement,
                        React.PropsWithChildren<{}>
                    >(function CustomButton(props, ref) {
                        return (
                            <DocSearchButton ref={ref} {...props} iconOnly />
                        );
                    })}
                />
                <CommonThemeToggle
                    className={clsx("scale-75", "sm:scale-100")}
                />
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
        <>
            <TopAnnouncement />
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
        </>
    );
};
