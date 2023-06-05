import clsx from "clsx";
import React from "react";
import { LightModeIcon } from "./icons/light-mode";
import { useColorMode } from "@docusaurus/theme-common";

export const CommonThemeToggle = () => {
    const { colorMode, setColorMode } = useColorMode();
    console.log(colorMode);

    return (
        <button
            type="button"
            className={clsx(
                "bg-gray-700",
                "w-10 h-10",
                "rounded-full",
                "flex items-center justify-center",
                "border-0",
                "appearance-none",
                "focus:outline-none",
                "text-gray-400",
                "hover:brightness-125",
                "focus:brightness-110",
                "active:brightness-110",
                "transition-all",
                "duration-200",
                "ease-in-out",
            )}
        >
            <LightModeIcon />
        </button>
    );
};
