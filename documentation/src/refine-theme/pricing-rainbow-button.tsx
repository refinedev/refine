import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { PlayOutlinedIcon } from "./icons/play-outlined";
import { PricingPlaneIcon } from "./icons/pricing-plane";

type Props = {
    children?: React.ReactNode;
    href?: string;
    onClick?: () => void;
};

export const PricingRainbowButton = ({ children, href, onClick }: Props) => {
    const Comp = href ? Link : "button";
    return (
        <Comp
            {...(href ? { href, to: href } : {})}
            {...(onClick ? { onClick } : {})}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "z-[1]",
                "appearance-none",
                "focus:outline-none",
                "block",
                "relative",
                "text-refine-bg",
                "hover:no-underline",
                "hover:text-refine-bg",
                "z-[1]",
                "group",
                "my-1",
            )}
        >
            <div
                className={clsx(
                    "absolute",
                    "-left-0.5",
                    "-top-0.5",
                    "blur",
                    "overflow-hidden",
                    "rounded-lg",
                    "w-[calc(100%+0.25rem)] h-[calc(100%+0.25rem)]",
                    "z-[-1]",
                )}
            >
                <div
                    className={clsx(
                        "absolute",
                        "w-[125%] aspect-square h-auto",
                        "left-[-12.5%]",
                        "top-[-48px]",
                        "bg-landing-rainbow",
                        "animate-spin-slow",
                        "animation-slower-speed",
                        "animation-paused",
                        "group-hover:animation-running",
                    )}
                />
            </div>
            <div
                className={clsx(
                    "bg-gray-0",
                    "w-24",
                    "pricing-content-sm:w-auto",
                    "rounded-lg",
                    "py-1 px-3",
                    "pricing-content:px-6 pricing-content:py-2",
                )}
            >
                <div
                    className={clsx(
                        "gap-2",
                        "flex items-center justify-center",
                        "group-hover:scale-105",
                        "duration-100 ease-in-out transition-transform",
                    )}
                >
                    <>
                        <PricingPlaneIcon className="hidden pricing-content:block" />
                        <span
                            className={clsx(
                                "text-xs",
                                "pricing-content-sm:text-base",
                                "pricing-content:text-xl",
                                "pricing-contnet:leading-8",
                                "font-semibold",
                            )}
                        >
                            Contact Us
                        </span>
                    </>
                </div>
            </div>
        </Comp>
    );
};
