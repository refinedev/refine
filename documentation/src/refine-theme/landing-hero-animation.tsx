import React from "react";
import clsx from "clsx";
import { LandingHeroViteIcon } from "./icons/landing-hero/vite";
import { LandingHeroGridSvg } from "./icons/landing-hero-grid";
import { LandingHeroCenterSvg } from "./icons/landing-hero-center";
import { LandingHeroBeamSvg } from "./icons/landing-hero-beam";
import { LandingHeroItemNodeSvg } from "./icons/landing-hero-item-node";

type ItemProps = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
};
const Item = React.memo(function ItemBase({ vertical, horizontal }: ItemProps) {
    return (
        <div
            className={clsx(
                "rounded-[64px]",
                "bg-gray-0",
                "dark:bg-gray-900",
                "dark:bg-opacity-50",
                "border",
                "border-solid",
                "border-gray-300",
                "dark:border-gray-700",
                "flex",
                "items-center",
                "justify-between",
                "relative",
            )}
        >
            <div>
                <LandingHeroViteIcon />
            </div>
            <div className={clsx("py-3.5", "pr-6")}>
                <div
                    className={clsx(
                        "font-disket",
                        "font-bold",
                        "text-gray-500",
                        "uppercase",
                        "text-xs",
                    )}
                >
                    react platform
                </div>
                <div
                    className={clsx(
                        "font-medium",
                        "text-xs",
                        "text-gray-900",
                        "dark:text-transparent",
                        "dark:bg-clip-text",
                        "dark:bg-landing-hero-item-name-gradient",
                    )}
                >
                    Vite
                </div>
            </div>
            <LandingHeroItemNodeSvg
                className={clsx(
                    "fill-gray-500",
                    "stroke-gray-700",
                    "absolute",
                    horizontal === "right"
                        ? "-scale-x-100 right-7"
                        : "scale-x-100 left-7",
                    vertical === "bottom"
                        ? "-scale-y-100 bottom-full -mb-px"
                        : "scale-y-100 top-full -mt-px",
                )}
            />
        </div>
    );
});

export const LandingHeroAnimation = React.memo(function HeroAnimation() {
    return (
        <div className={clsx()}>
            <div className={clsx("relative", "w-min")}>
                <LandingHeroGridSvg
                    className={clsx(
                        "w-[404px]",
                        "h-[360px]",
                        "landing-lg:w-[690px]",
                        "landing-lg:h-[480px]",
                        "left-0",
                        "top-0",
                        "bottom-0",
                        "right-0",
                    )}
                />
                <LandingHeroCenterSvg
                    className={clsx(
                        "absolute",
                        "left-1/2 top-1/2",
                        "-translate-x-1/2 -translate-y-1/2",
                        "z-[1]",
                    )}
                />
                <div
                    className={clsx(
                        "hidden",
                        "landing-lg:flex",
                        "absolute",
                        "left-0",
                        "top-0",
                        "bottom-0",
                        "right-0",
                        "w-full",
                        "h-full",
                        "py-12",
                        "px-[89px]",
                        "flex-col",
                        "items-start",
                        "justify-between",
                    )}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "flex",
                            "items-start",
                            "justify-between",
                        )}
                    >
                        <Item vertical="top" horizontal="left" />
                        <Item vertical="top" horizontal="right" />
                    </div>
                    <div
                        className={clsx(
                            "mt-auto",
                            "w-full",
                            "flex",
                            "items-end",
                            "justify-between",
                        )}
                    >
                        <Item vertical="bottom" horizontal="left" />
                        <Item vertical="bottom" horizontal="right" />
                    </div>
                </div>
                <LandingHeroBeamSvg
                    className={clsx(
                        "z-[0]",
                        "absolute",
                        "left-1/2",
                        "top-1/2",
                        "-translate-x-1/2",
                        "translate-y-0",
                        "landing-lg:translate-y-16",
                    )}
                    style={{
                        filter: "drop-shadow(rgb(71, 235, 235) 0px 0px 3px) drop-shadow(rgb(71, 235, 235) 0px 0px 8px)",
                    }}
                />
                <div
                    className={clsx(
                        "-mt-6",
                        "pt-6",
                        "px-6",
                        "overflow-hidden",
                        "absolute",
                        "left-1/2",
                        "-translate-x-1/2",
                        "top-1/2",
                        "landing-lg:top-[calc(50%+64px)]",
                        "translate-y-64",
                    )}
                >
                    <div
                        className={clsx(
                            "relative",
                            "w-40",
                            "h-px",
                            "bg-landing-hero-beam-bottom",
                        )}
                    >
                        <div
                            className={clsx(
                                "absolute",
                                "-top-2",
                                "-translate-x-1/2",
                                "left-1/2",
                                "w-full",
                                "pb-[50%]",
                                "rounded-full",
                                "blur-[8px]",
                                "bg-refine-cyan-alt",
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
