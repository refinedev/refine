import React from "react";
import clsx from "clsx";
import { OrangeStarIcon } from "./icons/orange-star";

export const LandingHeroGithubStars = () => {
    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "self-start",
                "py-2",
                "pl-2",
                "pr-4",
                "flex",
                "gap-2",
                "items-center",
                "justify-center",
                "rounded-3xl",
                "border border-solid",
                "border-gray-200 dark:border-gray-700",
                "bg-gray-50 dark:bg-gray-900",
                "dark:bg-landing-hero-github-stars-gradient",
            )}
        >
            <OrangeStarIcon />
            <span
                className={clsx(
                    "font-normal",
                    "text-xs",
                    "text-transparent",
                    "bg-clip-text",
                    "bg-landing-hero-github-stars-text-light",
                    "dark:bg-landing-hero-github-stars-text-dark",
                )}
            >
                <span className={clsx("font-semibold")}>16.5K</span>{" "}
                <span>GitHub stars so far</span>
            </span>
        </a>
    );
};
