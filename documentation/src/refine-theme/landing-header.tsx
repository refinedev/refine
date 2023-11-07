import clsx from "clsx";
import React from "react";

import Link from "@docusaurus/Link";

import { Menu } from "./common-header/menu";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";

import { LandingGithubStarButton } from "./landing-github-star-button";

import { openFigma } from "../utils/open-figma";
import { HamburgerIcon } from "./icons/hamburger";
import { RefineLogoIcon } from "./icons/refine-logo";
import { TopAnnouncement } from "./top-announcement";
import { CommonThemeToggle } from "./common-theme-toggle";

export const LandingHeader = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <TopAnnouncement />
            <header
                className={clsx(
                    "sticky",
                    "top-0",
                    "z-10",
                    "p-4",
                    "landing-sm:px-8",
                    "landing-md:py-5",
                    "backdrop-blur-sm",
                )}
            >
                <div
                    className={clsx(
                        "w-full",
                        "h-full",
                        "z-[-1]",
                        "absolute",
                        "pointer-events-none",
                        "left-0",
                        "right-0",
                        "top-0",
                        "bottom-0",
                        "bg-gray-0 dark:bg-gray-900",
                        "transition-colors",
                        "duration-150",
                        "ease-in-out",
                        "opacity-60",
                    )}
                />
                <div
                    className={clsx(
                        "mx-auto",
                        "flex",
                        "items-center",
                        "justify-between",
                        "max-w-[896px]",
                        "landing-lg:max-w-[1200px]",
                    )}
                >
                    <div className={clsx("w-[130px]", "landing-lg:w-[200px]")}>
                        <Link to="/" onContextMenu={openFigma}>
                            <RefineLogoIcon className="text-gray-900 dark:text-gray-0" />
                        </Link>
                    </div>
                    <button
                        type="button"
                        className={clsx(
                            "text-gray-900 dark:text-gray-0",
                            "block landing-md:hidden",
                        )}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <HamburgerIcon />
                    </button>
                    <div
                        className={clsx(
                            "hidden landing-md:flex",
                            "flex-1",
                            "items-center",
                            "gap-8",
                        )}
                    >
                        <Menu />
                    </div>
                    <div
                        className={clsx(
                            "hidden landing-md:flex",
                            "items-center",
                            "justify-end",
                            "gap-4",
                            "w-[130px]",
                            "landing-lg:w-[200px]",
                        )}
                    >
                        <LandingGithubStarButton />
                        <CommonThemeToggle />
                    </div>
                    <MobileMenuModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
            </header>
        </>
    );
};
