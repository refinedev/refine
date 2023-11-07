import clsx from "clsx";
import React, { FC, useEffect } from "react";
import {
    ComponentsIcon,
    RoutesIcon,
    UtilitiesIcon,
    InterfacesIcon,
    ProvidersIcon,
} from "../components/landing/icons";
import { motion, useAnimationControls, useInView } from "framer-motion";
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
    const controls = useAnimationControls();

    useEffect(() => {
        if (inView) {
            controls.start({
                x: 0,
                opacity: 1,
            });
        }
    }, [inView, controls]);

    return (
        <div className={clsx(className)}>
            <div
                ref={ref}
                className={clsx(
                    "not-prose",
                    "flex-shrink-0",
                    "p-2 landing-sm:p-4",
                    "rounded-3xl",
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
                    )}
                >
                    {list.map((item, index) => {
                        const isLast = index === list.length - 1;
                        const isFirst = index === 0;

                        const leftOffset = index * 32 - 32;

                        return (
                            <div
                                className={clsx(
                                    "relative",
                                    "flex items-center justify-center",
                                    "h-[1px]",
                                    "dark:bg-landing-component-divider-dark bg-landing-component-divider",
                                    isFirst ? "mt-10" : "mt-[52px]",
                                    isLast && "mb-10",
                                )}
                                key={index}
                            >
                                <div className={clsx("absolute", "w-[160px]")}>
                                    <motion.div
                                        initial={{
                                            x: 450 - leftOffset,
                                            opacity: 0,
                                        }}
                                        animate={controls}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.5,
                                            duration: 0.6,
                                            delay: 0.85 * index,
                                        }}
                                        style={{
                                            marginLeft: `${leftOffset}px`,
                                        }}
                                        className={clsx(
                                            "w-max",
                                            "rounded-full",
                                            "p-[1px]",
                                            "dark:bg-landing-component-badge bg-refine-green",
                                            "relative",
                                        )}
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
                                    </motion.div>
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
                        Wheel? already invented.
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
