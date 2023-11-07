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
                    "w-auto",
                    "h-auto",
                    "flex",
                    "-left-2",
                    "top-[14.5px]",
                    "items-start",
                    "rotate-[-21deg]",
                    "dark:rotate-[23deg]",
                    "origin-[center_53px]",
                    "group-hover:rotate-[1deg]",
                    "dark:group-active:rotate-[23deg]",
                    "group-active:rotate-[-21deg]",
                    "transition-transform",
                    "duration-150",
                    "ease-in-out",
                    "gap-5",
                )}
            >
                <LightModeIcon
                    className={clsx("flex-shrink-0", "pointer-events-none")}
                />
                <DarkModeIcon
                    className={clsx("flex-shrink-0", "pointer-events-none")}
                />
            </div>
            {/* <div
                className={clsx(
                    "absolute",
                    "w-full h-full",
                    "flex items-center justify-center",
                    "flex-shrink-0",
                    "top-10",
                    "dark:top-0",
                    "duration-200",
                    "ease-in-out",
                    "transition-[top,transform]",
                    // "dark:group-hover:scale-125",
                    "dark:group-hover:top-10",
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
                    "top-0",
                    "dark:top-10",
                    "duration-200",
                    "ease-in-out",
                    "transition-[top,transform]",
                    // "group-hover:scale-125",
                    "dark:group-hover:top-2",
                    // "dark:group-hover:scale-100",
                )}
            >
                <DarkModeIcon />
            </div> */}
        </button>
    );
};
