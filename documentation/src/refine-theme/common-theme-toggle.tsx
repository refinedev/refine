import React from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

import { LightModeIcon } from "./icons/light-mode";
import { DarkModeIcon } from "./icons/dark-mode";

type Props = {
    className?: string;
};

export const CommonThemeToggle = ({ className }: Props) => {
    const { colorMode, setColorMode } = useColorMode();

    const toggle = () => {
        setColorMode(colorMode === "dark" ? "light" : "dark");
    };

    return (
        <button
            type="button"
            className={clsx(
                "w-8 h-8 sm:w-10 sm:h-10",
                "bg-gray-200 dark:bg-gray-700",
                "rounded-full",
                "border-0",
                "appearance-none",
                "focus:outline-none",
                "relative",
                "text-gray-500 dark:text-gray-400",
                "hover:brightness-110",
                "transition-all",
                "duration-200",
                "ease-in-out",
                "overflow-hidden",
                "flex-shrink-0",
                className,
            )}
            onClick={toggle}
        >
            <div
                className={clsx(
                    "absolute",
                    "w-8 h-8 sm:w-10 sm:h-10",
                    "flex items-center justify-center",
                    "flex-shrink-0",
                    "top-10",
                    "dark:top-0",
                    "duration-200",
                    "ease-in-out",
                    "transition-all",
                )}
            >
                <LightModeIcon />
            </div>
            <div
                className={clsx(
                    "absolute",
                    "w-8 h-8 sm:w-10 sm:h-10",
                    "flex items-center justify-center",
                    "flex-shrink-0",
                    "top-0",
                    "dark:top-10",
                    "duration-200",
                    "ease-in-out",
                    "transition-all",
                )}
            >
                <DarkModeIcon />
            </div>
        </button>
    );
};
