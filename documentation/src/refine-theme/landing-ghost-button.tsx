import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import { PlayOutlinedIcon } from "./icons/play-outlined";
import { DocItemOutlined } from "./icons/doc-item-outlined";

export const LandingGhostButton = () => {
    return (
        <Link
            href="#form"
            className={clsx(
                "relative",
                "text-gray-0",
                "hover:no-underline",
                "hover:text-gray-0",
                "z-[1]",
                "group",
            )}
        >
            <div
                className={clsx(
                    "absolute",
                    "-left-[1.5px]",
                    "-top-[1.5px]",
                    "overflow-hidden",
                    "rounded-lg",
                    "w-[calc(100%+2.5px)] h-[calc(100%+2.5px)]",
                    "z-[-1]",
                )}
            >
                <div
                    className={clsx(
                        "absolute",
                        "w-[125%] aspect-square h-auto",
                        "left-[-12.5%]",
                        "top-[-100px]",
                        "bg-landing-ghost",
                        "animate-spin-slow",
                        "animation-slow-speed",
                    )}
                />
            </div>
            <div className={clsx("bg-refine-bg", "rounded-lg", "px-10 py-3")}>
                <div
                    className={clsx(
                        "gap-2",
                        "flex items-center justify-center",
                        "group-hover:scale-105",
                        "duration-100 ease-in-out transition-transform",
                    )}
                >
                    <DocItemOutlined />
                    <span className="text-base font-semibold">
                        Learn refine
                    </span>
                </div>
            </div>
        </Link>
    );
};
