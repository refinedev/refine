import clsx from "clsx";
import React, { FC } from "react";
import {
    ComponentsIcon,
    RoutesIcon,
    UtilitiesIcon,
    InterfacesIcon,
    ProvidersIcon,
} from "../components/landing/icons";
import { useInView } from "framer-motion";
import { LandingSectionCtaButton } from "./landing-section-cta-button";

const list = [
    {
        label: "Components",
        icon: <ComponentsIcon />,
    },
    {
        label: "Routes",
        icon: <RoutesIcon />,
    },
    {
        label: "Utilities",
        icon: <UtilitiesIcon />,
    },
    {
        label: "Interfaces",
        icon: <InterfacesIcon />,
    },
    {
        label: "Providers",
        icon: <ProvidersIcon />,
    },
];

type Props = {
    className?: string;
};

export const LandingAlreadyInvented: FC<Props> = ({ className }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    return (
        <div className={clsx(className)}>
            <div
                ref={ref}
                className={clsx(
                    "not-prose",
                    "flex-shrink-0",
                    "h-full",
                    "p-2 landing-sm:p-4",
                    "rounded-2xl landing-sm:rounded-3xl",
                    "dark:bg-landing-noise",
                    "dark:bg-gray-800 bg-gray-50",
                )}
            >
                <div
                    className={clsx(
                        "flex",
                        "flex-col",
                        "rounded-lg",
                        "dark:bg-landing-component-dark bg-landing-component",
                        "py-3.5",
                        "border-t-solid border-t",
                        "border-t-gray-200 dark:border-t-gray-700",
                        "border-opacity-60 dark:border-opacity-60",
                        "shadow-[0px_-1.5px_0px_rgba(237,242,247,0.5)] dark:shadow-[0px_-1.5px_0px_rgba(20,20,31,0.5)]",
                        "drop-shadow-sm",
                    )}
                >
                    {list.map((item, index) => {
                        const paddingHorizontal = `calc((100% - 160px - ${
                            (list.length - 1) * 36
                        }px) / 2)`;

                        return (
                            <div
                                className={clsx(
                                    "py-1.5",
                                    "h-[54px]",
                                    "relative",
                                    "flex items-center justify-start",
                                    "dark:bg-landing-component-divider-dark bg-landing-component-divider",
                                    "bg-no-repeat",
                                    "bg-wheel-already-invented-size",
                                    "bg-wheel-already-invented-position",
                                    "overflow-hidden",
                                )}
                                style={{
                                    paddingLeft: paddingHorizontal,
                                    paddingRight: paddingHorizontal,
                                }}
                                key={index}
                            >
                                <div
                                    className={clsx("min-w-[160px]")}
                                    style={{
                                        marginLeft: 36 * index,
                                    }}
                                >
                                    <div
                                        className={clsx(
                                            "w-max",
                                            "rounded-full",
                                            "p-[1px]",
                                            "dark:bg-landing-component-badge bg-refine-green",
                                            "relative",
                                            inView &&
                                                "animate-wheel-already-invented-reveal",
                                        )}
                                        style={{
                                            transform: `translateX(${
                                                40 * (11 - index)
                                            }px)`,
                                            animationDelay: `${
                                                0.15 + index * 0.15
                                            }s`,
                                        }}
                                    >
                                        <div
                                            className={clsx(
                                                "rounded-full",
                                                "py-2 pr-6 pl-[10px]",
                                                "flex items-center justify-center gap-2",
                                                "dark:bg-gray-900 bg-gray-0",
                                            )}
                                        >
                                            <div>{item.icon}</div>
                                            <div>{item.label}</div>
                                        </div>
                                        <div
                                            className={clsx(
                                                "dark:block hidden",
                                                "absolute",
                                                "-top-6 -left-6",
                                                "rounded-full",
                                                "w-20 h-20",
                                                "z-10",
                                                "blur-md",
                                                "bg-landing-component-badge-glow",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={clsx(
                        "not-prose",
                        "mt-4 landing-sm:mt-6 landing-lg:mt-10",
                        "px-4 landing-sm:px-6",
                    )}
                >
                    <h6
                        className={clsx(
                            "p-0",
                            "font-semibold",
                            "text-base landing-sm:text-2xl",
                            "dark:text-gray-300 text-gray-900",
                        )}
                    >
                        Wheel? Already invented.
                    </h6>
                    <div
                        className={clsx(
                            "not-prose",
                            "flex",
                            "items-center",
                            "justify-between",
                            "flex-wrap",
                            "gap-4 landing-sm:gap-8",
                            "mb-4 landing-sm:mb-6",
                        )}
                    >
                        <p
                            className={clsx(
                                "h-auto landing-md:h-[72px] landing-lg:h-auto",
                                "p-0",
                                "mt-2 landing-sm:mt-4",
                                "text-base",
                                "dark:text-gray-400 text-gray-600",
                            )}
                        >
                            Start with a well-structured boilerplate, built
                            around the industry’s best practices.
                        </p>
                        <LandingSectionCtaButton to="/docs">
                            Learn more
                        </LandingSectionCtaButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
