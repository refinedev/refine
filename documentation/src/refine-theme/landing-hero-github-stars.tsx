import React from "react";
import clsx from "clsx";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { OrangeStarIcon } from "./icons/orange-star";
import { Spinner } from "./spinner";

export const LandingHeroGithubStars = () => {
    const { loading, githubStarCountText } = useCommunityStatsContext();

    return (
        <a
            href="https://github.com/refinedev/refine"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "self-start",
                "py-[7px]",
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
                "hover:no-underline",
            )}
        >
            <OrangeStarIcon
                style={{
                    filter: "drop-shadow(0px 0px 3px #FF993330) drop-shadow(0px 0px 6px #FF9933A0) drop-shadow(0px 0px 16px #FF9933A0) drop-shadow(0px 0px 16px #FF9933)",
                }}
            />
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
                <span className={clsx("font-semibold")}>
                    {loading ? (
                        <Spinner
                            className={clsx("w-3.5 h-3.5", "inline")}
                            wrapperProps={{
                                className: clsx(
                                    "h-3.5",
                                    "inline-block",
                                    "w-[4ch]",
                                ),
                            }}
                        />
                    ) : (
                        <span>{githubStarCountText}</span>
                    )}
                </span>{" "}
                <span>GitHub stars so far</span>
            </span>
        </a>
    );
};
