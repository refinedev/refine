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
                "appearance-none",
                "focus:outline-none",
                "relative",
                "w-10 h-10",
                "rounded-full",
                "border",
                "border-solid",
                "border-gray-300 dark:border-gray-700",
                "text-gray-500",
                "transition-colors",
                "duration-150",
                "ease-in-out",
                "overflow-hidden",
                "flex-shrink-0",
                "group",
                className,
            )}
            onClick={toggle}
        >
            <div
                className={clsx(
                    "absolute",
                    "w-full h-full",
                    "flex items-center justify-center",
                    "flex-shrink-0",
                    "top-10",
                    "translate-y-0",
                    "dark:-translate-y-10",
                    "duration-200",
                    "ease-in-out",
                    "transition-transform",
                )}
            >
                <LightModeIcon />
            </div>
            <div
                className={clsx(
                    "absolute",
                    "w-full h-full",
                    "flex items-center justify-center",
                    "flex-shrink-0",
                    "top-10",
                    "-translate-y-10",
                    "dark:translate-y-0",
                    "duration-200",
                    "ease-in-out",
                    "transition-transform",
                )}
            >
                <DarkModeIcon />
            </div>
        </button>
    );
};
