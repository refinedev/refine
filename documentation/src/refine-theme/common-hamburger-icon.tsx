import clsx from "clsx";
import React from "react";
import { HamburgerIcon } from "./icons/hamburger";
import { CloseIcon } from "./icons/close";

type Props = {
    className?: string;
    active?: boolean;
    onClick?: () => void;
};

export const CommonHamburgerIcon = ({ active, className, onClick }: Props) => {
    return (
        <button
            className={clsx(
                "w-8 h-8 sm:w-10 sm:h-10",
                "flex items-center justify-center flex-shrink-0",
                "text-gray-500 dark:text-gray-400",
                "rounded-full",
                "hover:bg-gray-200 hover:dark:bg-gray-700",
                "transition-[background-color]",
                "duration-200",
                "ease-in-out",
                className,
            )}
            onClick={onClick}
        >
            {active ? <CloseIcon /> : <HamburgerIcon />}
        </button>
    );
};
