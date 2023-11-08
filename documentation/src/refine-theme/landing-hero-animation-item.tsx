import React from "react";
import clsx from "clsx";
import { LandingHeroItemNodeSvg } from "./icons/landing-hero-item-node";
import {
    ChangingTextElement,
    ChangingTextElementRef,
} from "./changing-text-element";

type ItemProps = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
    previousName?: string;
    icon: React.ReactNode;
    section: string;
    name: string;
    color: string;
};

export const LandingHeroAnimationItem = React.memo(
    function ItemBase({
        vertical,
        horizontal,
        previousName,
        icon,
        section,
        name,
        color,
    }: ItemProps) {
        const ref = React.useRef<ChangingTextElementRef>(null);

        React.useEffect(() => {
            if (ref.current) {
                ref.current.start();
            }
        }, [name]);

        return (
            <div
                className={clsx(
                    "min-w-[207px]",
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
                    horizontal === "right" ? "flex-row-reverse" : "flex-row",
                )}
            >
                <div
                    className={clsx(
                        "flex-shrink-0",
                        "w-16",
                        "h-16",
                        "relative",
                        "animate-opacity-reveal",
                    )}
                    key={name}
                >
                    {icon}
                </div>
                <div
                    className={clsx(
                        "flex-1",
                        horizontal === "left" && ["py-3.5", "pr-6"],
                        horizontal === "right" && ["py-3.5", "pl-6"],
                    )}
                >
                    <div
                        className={clsx(
                            "font-disket",
                            "font-bold",
                            "text-gray-500",
                            "uppercase",
                            "text-xs",
                            horizontal === "left" && "text-left",
                            horizontal === "right" && "text-right",
                        )}
                    >
                        {section}
                    </div>
                    <div
                        className={clsx(
                            "font-medium",
                            "text-xs",
                            "text-gray-900",
                            "dark:text-transparent",
                            "dark:bg-clip-text",
                            "dark:bg-landing-hero-item-name-gradient",
                            horizontal === "left" && "text-left",
                            horizontal === "right" && "text-right",
                        )}
                    >
                        <ChangingTextElement
                            ref={ref}
                            first={previousName ?? name}
                            second={name}
                            tick={50}
                        />
                    </div>
                </div>
                <LandingHeroItemNodeSvg
                    className={clsx(
                        "fill-gray-300",
                        "stroke-gray-400",
                        "dark:fill-gray-500",
                        "dark:stroke-gray-700",
                        "absolute",
                        horizontal === "right"
                            ? "-scale-x-100 right-7"
                            : "scale-x-100 left-7",
                        vertical === "bottom"
                            ? "-scale-y-100 bottom-full -mb-px"
                            : "scale-y-100 top-full -mt-px",
                    )}
                />
                <div
                    className={clsx(
                        "w-[172px]",
                        "h-[100px]",
                        "absolute",
                        "overflow-hidden",
                        "z-[10]",
                        horizontal === "right"
                            ? "-scale-x-100 right-7"
                            : "scale-x-100 left-7",
                        vertical === "bottom"
                            ? "-scale-y-100 bottom-full -mb-px"
                            : "scale-y-100 top-full -mt-px",
                    )}
                    style={{
                        maskType: "alpha",
                        WebkitMaskImage:
                            "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
                        maskImage:
                            "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
                    }}
                >
                    <div
                        key={name}
                        className={clsx(
                            "w-[calc(172px*2)]",
                            "h-[calc(172px*2)]",
                            "left-0",
                            "top-0",
                            "absolute",
                            "animate-beam-spin",
                            "will-change-transform",
                            "bg-landing-hero-beam-bg",
                        )}
                        style={{
                            color,
                        }}
                    />
                </div>
            </div>
        );
    },
    (p, n) => p.name === n.name,
);
