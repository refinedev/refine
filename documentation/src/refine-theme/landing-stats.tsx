import React from "react";
import clsx from "clsx";
import { LandingStatsGithubIcon } from "./icons/landing-stats-github";
import { CountingNumber } from "../components/counting-number";
import { LandingStatsDiscordIcon } from "./icons/landing-stats-discord";
import { LandingStatsTwitterIcon } from "./icons/landing-stats-twitter";
import { useCommunityNumberContext } from "@site/src/context/CommunityNumber";

const NumberField = ({ number, label }: { number: number; label: string }) => {
    return (
        <div
            className={clsx(
                "flex flex-col",
                "landing-md:w-[144px] landing-lg:w-auto",
            )}
        >
            <div
                className={clsx(
                    "bg-landing-text-bg",
                    "bg-clip-text text-transparent",
                    "text-[32px] leading-[40px]",
                    "landing-lg:text-[40px] landing-lg:leading-[48px]",
                    "font-semibold",
                )}
            >
                <CountingNumber to={number} from={0} duration={1} format once />
                <span>+</span>
            </div>
            <div
                className={clsx(
                    "bg-landing-text-bg",
                    "bg-clip-text text-transparent",
                    "text-[16px] leading-[24px]",
                    "landing-lg:text-[24px] landing-lg:leading-[32px]",
                    "font-light",
                )}
            >
                {label}
            </div>
        </div>
    );
};

const GithubStats = ({ className }: { className?: string }) => {
    const { githubStarCount, githubCommitCount } = useCommunityNumberContext();
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "overflow-hidden",
                "bg-refine-landing-stats-fallback-bg",
                "bg-landing-stats-border-bg",
                "group",
                className,
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
                    "p-6",
                    "landing-md:p-10",
                    "landing-lg:p-12",
                )}
            >
                <div
                    className={clsx(
                        "flex flex-row",
                        "gap-6",
                        "landing-md:gap-4",
                        "landing-lg:gap-12",
                        "items-center",
                        "landing-md:items-start",
                    )}
                >
                    <div className="flex-shrink-0">
                        <LandingStatsGithubIcon
                            className={clsx(
                                "h-24 w-24",
                                "landing-md:w-16 landing-md:h-16",
                                "landing-lg:w-24 landing-lg:h-24",
                            )}
                        />
                    </div>
                    <div
                        className={clsx(
                            "flex-1",
                            "flex",
                            "landing-md:justify-between",
                            "landing-lg:justify-start",
                            "flex-col",
                            "landing-md:flex-row",
                            "landing-lg:flex-col",
                            "gap-6",
                        )}
                    >
                        <div className={clsx("landing-md:block hidden")}>
                            <NumberField number={150} label="Contributors" />
                        </div>
                        <div className={clsx("block", "landing-md:hidden")}>
                            <NumberField
                                number={githubStarCount}
                                label="GitHub Stars"
                            />
                        </div>
                        <div
                            className={clsx(
                                "landing-md:flex hidden",
                                "flex-1",
                                "landing-md:flex-row landing-lg:flex-col flex-row gap-6",
                            )}
                        >
                            <NumberField
                                number={githubCommitCount}
                                label="Commits"
                            />
                            <div className={clsx("landing-md:hidden block")}>
                                <NumberField
                                    number={150}
                                    label="Contributors"
                                />
                            </div>
                            <div className={clsx("hidden", "landing-md:block")}>
                                <NumberField
                                    number={githubStarCount}
                                    label="GitHub Stars"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={clsx(
                        "mt-4",
                        "pl-2",
                        "pr-6",
                        "landing-md:hidden grid w-full grid-cols-2 place-content-start items-center justify-center",
                    )}
                >
                    <NumberField number={150} label="Contributors" />
                    <NumberField number={githubCommitCount} label="Commits" />
                </div>
            </div>
        </div>
    );
};

const DiscordStats = () => {
    const { discordMemberCount } = useCommunityNumberContext();
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "overflow-hidden",
                "bg-refine-landing-stats-fallback-bg",
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
                    "p-6",
                    "landing-md:p-10",
                    "landing-lg:p-12",
                    "flex flex-row",
                    "items-center",
                    "gap-8",
                    "landing-md:gap-4",
                    "landing-lg:gap-12",
                )}
            >
                <div className="flex-shrink-0">
                    <LandingStatsDiscordIcon
                        className={clsx(
                            "h-24 w-24",
                            "landing-md:w-16 landing-md:h-16",
                            "landing-lg:w-24 landing-lg:h-24",
                        )}
                    />
                </div>
                <div className={clsx("flex flex-col gap-6")}>
                    <NumberField
                        number={discordMemberCount}
                        label="Discord Members"
                    />
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
                "bg-refine-landing-stats-fallback-bg",
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
                    "p-6",
                    "landing-md:p-10",
                    "landing-lg:p-12",
                    "flex flex-row",
                    "items-center",
                    "gap-8",
                    "landing-md:gap-4",
                    "landing-lg:gap-12",
                )}
            >
                <div className="flex-shrink-0">
                    <LandingStatsTwitterIcon
                        className={clsx(
                            "h-24 w-24",
                            "landing-md:w-16 landing-md:h-16",
                            "landing-lg:w-24 landing-lg:h-24",
                        )}
                    />
                </div>
                <div className={clsx("flex flex-col gap-6")}>
                    <NumberField number={2000} label="Twitter Followers" />
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
                "max-w-[324px]",
                "landing-md:max-w-screen-landing-md",
                "landing-lg:px-0 px-2",
                "landing-lg:max-w-screen-landing-content",
                "flex flex-col",
                "gap-12",
                "mx-auto",
                "mb-12",
            )}
        >
            <div
                className={clsx(
                    "z-[1]",
                    "bg-landing-text-bg-alt",
                    "bg-clip-text",
                    "text-transparent",
                    "text-[1.5rem]",
                    "leading-[2rem]",
                    "landing-md:text-[2rem]",
                    "landing-md:leading-[2.5rem]",
                    "landing-lg:text-[2.5rem]",
                    "landing-lg:leading-[3rem]",
                    "text-center",
                    "font-semibold",
                )}
            >
                <span
                    className={clsx(
                        "landing-md:inline block",
                        "bg-landing-text-bg",
                        "bg-clip-text",
                        "text-transparent",
                    )}
                >
                    Feel the power of
                </span>{" "}
                <span
                    className={clsx(
                        "landing-md:inline block",
                        "bg-landing-text-bg",
                        "bg-clip-text",
                        "text-transparent",
                    )}
                >
                    a great community
                </span>
            </div>
            <div
                className={clsx(
                    "w-full",
                    "grid",
                    "grid-cols-1",
                    "landing-md:grid-cols-2",
                    "gap-4",
                )}
            >
                <GithubStats
                    className={clsx(
                        "landing-md:col-span-2 landing-lg:col-span-1 col-span-1",
                    )}
                />
                <div
                    className={clsx(
                        "col-span-1",
                        "landing-md:col-span-2",
                        "landing-lg:col-span-1",
                        "landing-md:grid-cols-2 landing-lg:grid-cols-1 grid grid-cols-1 gap-4",
                    )}
                >
                    <DiscordStats />
                    <TwitterStats />
                </div>
            </div>
        </div>
    );
};
