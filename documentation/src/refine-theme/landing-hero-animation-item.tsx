import React from "react";
import clsx from "clsx";
import { LandingHeroItemNodeSvg } from "./icons/landing-hero-item-node";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChangingTextElement,
    ChangingTextElementRef,
} from "./changing-text-element";

const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

type ItemProps = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right";
    previousName?: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    section: string;
    name: string;
    color: string;
};

export const LandingHeroAnimationItem = function ItemBase({
    vertical,
    horizontal,
    previousName,
    icon: Icon,
    section,
    name,
    color,
}: ItemProps) {
    const ref = React.useRef<ChangingTextElementRef>(null);

    React.useEffect(() => {
        if (ref.current) {
            ref.current.start();
        }
    }, [ref]);

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
                    "overflow-hidden",
                    horizontal === "left"
                        ? "rounded-tl-[64px] rounded-bl-[64px]"
                        : "rounded-tr-[64px] rounded-br-[64px]",
                )}
            >
                <AnimatePresence>
                    <motion.div
                        key={name}
                        initial={{
                            rotate: horizontal === "left" ? -90 : 90,
                        }}
                        animate={{
                            rotate: 0,
                        }}
                        exit={{
                            rotate: horizontal === "left" ? 90 : -90,
                        }}
                        transition={{
                            type: "spring",
                            damping: 8,
                            stiffness: 100,
                        }}
                        className={clsx(
                            "absolute",
                            "w-32",
                            "h-32",
                            horizontal === "left" && "-left-full",
                            horizontal === "right" && "-right-full",
                            "-top-1/2",
                            "flex",
                            "items-center",
                            horizontal === "right"
                                ? "justify-start"
                                : "justify-end",
                        )}
                    >
                        <Icon
                            className="text-gray-1000 dark:text-gray-0"
                            style={{
                                filter: `drop-shadow(0 0 8px ${hexToRgba(
                                    color,
                                    0.5,
                                )}) drop-shadow(0 0 15px ${hexToRgba(
                                    color,
                                    0.3,
                                )})`,
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
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
                    className={clsx(
                        "w-[calc(172px*2)]",
                        "h-[calc(172px*2)]",
                        "left-0",
                        "top-0",
                        "absolute",
                        "animate-beam-spin",
                        "bg-landing-hero-beam-bg",
                    )}
                    style={{
                        color,
                    }}
                />
            </div>
        </div>
    );
};
