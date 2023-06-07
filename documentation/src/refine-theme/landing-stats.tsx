import React from "react";
import clsx from "clsx";
import { LandingStatsGithubIcon } from "./icons/landing-stats-github";
import { CountingNumber } from "../components/counting-number";
import { LandingStatsDiscordIcon } from "./icons/landing-stats-discord";
import { LandingStatsTwitterIcon } from "./icons/landing-stats-twitter";

const GithubStats = () => {
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "overflow-hidden",
                "bg-[#242442]",
                "bg-landing-stats-border-bg",
                "group",
            )}
        >
            <div
                className={clsx(
                    "w-full",
                    "h-full",
                    "bg-refine-bg",
                    "bg-landing-stats-bg",
                    "rounded-xl",
                    "overflow-hidden",
                    "p-12",
                    "flex flex-row",
                    "gap-12",
                )}
            >
                <div className="flex-shrink-0">
                    <LandingStatsGithubIcon />
                </div>
                <div className={clsx("flex flex-col gap-6")}>
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[40px] leading-[48px] font-semibold",
                            )}
                        >
                            <CountingNumber
                                to={140}
                                from={0}
                                duration={1}
                                format
                                once
                            />
                            <span>+</span>
                        </div>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[24px] leading-[32px] font-light",
                            )}
                        >
                            Contributors
                        </div>
                    </div>
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[40px] leading-[48px] font-semibold",
                            )}
                        >
                            <CountingNumber
                                to={4300}
                                from={0}
                                duration={2}
                                format
                                once
                            />
                            <span>+</span>
                        </div>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[24px] leading-[32px] font-light",
                            )}
                        >
                            Commits
                        </div>
                    </div>
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[40px] leading-[48px] font-semibold",
                            )}
                        >
                            <CountingNumber
                                to={11000}
                                from={0}
                                duration={3}
                                format
                                once
                            />
                            <span>+</span>
                        </div>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[24px] leading-[32px] font-light",
                            )}
                        >
                            GitHub Stars
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DiscordStats = () => {
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "overflow-hidden",
                "bg-[#242442]",
                "bg-landing-stats-border-bg",
                "group",
            )}
        >
            <div
                className={clsx(
                    "w-full",
                    "h-full",
                    "bg-refine-bg",
                    "bg-landing-stats-bg",
                    "rounded-xl",
                    "overflow-hidden",
                    "p-12",
                    "flex flex-row",
                    "items-center",
                    "gap-12",
                )}
            >
                <div className="flex-shrink-0">
                    <LandingStatsDiscordIcon />
                </div>
                <div className={clsx("flex flex-col gap-6")}>
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[40px] leading-[48px] font-semibold",
                            )}
                        >
                            <CountingNumber
                                to={1500}
                                from={0}
                                duration={1.5}
                                format
                                once
                            />
                            <span>+</span>
                        </div>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[24px] leading-[32px] font-light",
                            )}
                        >
                            Discord Members
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TwitterStats = () => {
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "overflow-hidden",
                "bg-[#242442]",
                "bg-landing-stats-border-bg",
                "group",
            )}
        >
            <div
                className={clsx(
                    "w-full",
                    "h-full",
                    "bg-refine-bg",
                    "bg-landing-stats-bg",
                    "rounded-xl",
                    "overflow-hidden",
                    "p-12",
                    "flex flex-row",
                    "items-center",
                    "gap-12",
                )}
            >
                <div className="flex-shrink-0">
                    <LandingStatsTwitterIcon />
                </div>
                <div className={clsx("flex flex-col gap-6")}>
                    <div className={clsx("flex flex-col")}>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[40px] leading-[48px] font-semibold",
                            )}
                        >
                            <CountingNumber
                                to={1600}
                                from={0}
                                duration={1.5}
                                format
                                once
                            />
                            <span>+</span>
                        </div>
                        <div
                            className={clsx(
                                "bg-landing-text-bg",
                                "bg-clip-text text-transparent",
                                "text-[24px] leading-[32px] font-light",
                            )}
                        >
                            Twitter Followers
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LandingStats = () => {
    return (
        <div
            className={clsx(
                "w-full",
                "max-w-screen-landing-content",
                "flex flex-col",
                "gap-12",
                "mx-auto",
                "mb-12",
            )}
        >
            <div
                className={clsx(
                    "bg-landing-text-bg",
                    "bg-clip-text",
                    "text-transparent",
                    "text-[2.5rem]",
                    "leading-[3rem]",
                    "text-center",
                    "font-semibold",
                )}
            >
                Feel the power of a great community
            </div>
            <div className={clsx("w-full", "grid", "grid-cols-2", "gap-4")}>
                <GithubStats />
                <div className={clsx("grid grid-cols-1 gap-4")}>
                    <DiscordStats />
                    <TwitterStats />
                </div>
            </div>
        </div>
    );
};
