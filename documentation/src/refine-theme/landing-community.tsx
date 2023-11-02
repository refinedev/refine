import clsx from "clsx";
import React, { FC, useMemo } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import {
    convertStatToText,
    useCommunityStatsContext,
} from "../context/CommunityStats";
import { useAnimatedCounter } from "../hooks/use-animated-counter";
import { useInView } from "framer-motion";
import { CountingNumber } from "../components/counting-number";

type Props = {
    className?: string;
};

export const LandingCommunity: FC<Props> = ({ className }) => {
    const { colorMode } = useColorMode();

    const { discordMemberCount, githubStarCount } = useCommunityStatsContext();

    const list = useMemo(() => {
        return [
            {
                stat: githubStarCount,
                description: "Stars on GitHub",
            },
            {
                stat: 5_000,
                description:
                    "Projects on production, including large enterprises",
            },
            {
                stat: discordMemberCount,
                description: "Active developers in our open-source community",
            },
            {
                stat: 200_000,
                description: "End users are using apps built with refine",
            },
        ];
    }, [discordMemberCount, githubStarCount]);

    return (
        <div className={clsx(className, "w-full")}>
            <div
                className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}
            >
                <h2
                    className={clsx(
                        "text-2xl landing-sm:text-[32px]",
                        "tracking-tight",
                        "text-start",
                        "p-0",
                        "dark:text-gray-0 text-gray-900",
                    )}
                >
                    Feel the power of a{" "}
                    <span
                        className={clsx(
                            "font-semibold",
                            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                            "text-refine-blue drop-shadow-[0_0_30px_rgba(0,128,255,0.3)]",
                        )}
                    >
                        great community
                    </span>
                    .
                </h2>
            </div>

            <div
                className={clsx(
                    "mt-8 landing-sm:mt-12 landing-lg:mt-20",
                    "flex",
                    "flex-col landing-lg:flex-row",
                    "gap-4 landing-sm:gap-6 landing-md:gap-12 landing-lg:-gap-6",
                )}
            >
                <div
                    className={clsx(
                        "grid",
                        "grid-cols-1 landing-sm:grid-cols-2",
                        "gap-4 landing-sm:gap-6 landing-md:gap-12 landing-lg:-gap-6",
                    )}
                >
                    {list.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={clsx(
                                    "not-prose",
                                    "p-4 landing-sm:py-4 landing-sm:px-10",
                                    "dark:bg-landing-noise",
                                    "dark:bg-gray-800 bg-gray-50",
                                    "rounded-3xl",
                                )}
                            >
                                <StatText stat={item.stat} />
                                <div
                                    className={clsx(
                                        "mt-2 landing-sm:mt-6",
                                        "text-base",
                                        "dark:text-gray-400 text-gray-600",
                                    )}
                                >
                                    {item.description}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    className={clsx(
                        "w-full landing-lg:w-[486px]",
                        "not-prose",
                        "flex-shrink-0",
                        "p-4",
                        "rounded-3xl",
                        "dark:bg-landing-noise",
                        "dark:bg-gray-800 bg-gray-50",
                    )}
                >
                    <img
                        className={clsx("w-full", "object-cover")}
                        src={`https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/investors${
                            colorMode === "dark" ? "-dark" : ""
                        }.png`}
                        alt="investors"
                        loading="lazy"
                    />
                    <div
                        className={clsx(
                            "mt-6",
                            "text-base",
                            "not-prose",
                            "dark:text-gray-400 text-gray-600",
                        )}
                    >
                        Backed by{" "}
                        <span
                            className={clsx("dark:text-gray-0 text-gray-900")}
                        >
                            Y Combinator
                        </span>{" "}
                        (YC S23) and{" "}
                        <span
                            className={clsx("dark:text-gray-0 text-gray-900")}
                        >
                            500 Emerging Europe
                        </span>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatText: FC<{ stat: number }> = ({ stat }) => {
    return (
        <CountingNumber
            to={stat}
            from={0}
            duration={1}
            format={(value) => `${convertStatToText(value)}+`}
            className={clsx(
                "text-[40px] leading-[48px] landing-sm:text-[64px] landing-sm:leading-[72px]",
                "-tracking-tighter",
                "dark:bg-landing-stats-text-dark bg-landing-stats-text",
                "bg-clip-text",
                "text-transparent",
                "font-bold",
                "drop-shadow-2xl",
            )}
        />
    );
};
