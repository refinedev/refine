import clsx from "clsx";
import React, { FC } from "react";
import {
    SecurityIcon,
    BestPracticeIcon,
    InfiniteScalabilityIcon,
    NoVendorLockinIcon,
    ProServicesIcon,
    SelfHostedIcon,
} from "../components/landing/icons";

const list = [
    {
        icon: <SecurityIcon />,
        title: "Security",
        description: "Zero Trust model with SSO and SCIM directory sync.",
    },
    {
        icon: <InfiniteScalabilityIcon />,
        title: "Infinite Scalability",
        description:
            "Built with the most complex business applications in mind.",
    },
    {
        icon: <SelfHostedIcon />,
        title: "Self-hosted",
        description:
            "Deploy to your own infrastructure and always stay in control.",
    },
    {
        icon: <NoVendorLockinIcon />,
        title: "No vendor lock-in",
        description: "Open-source solution with open architecture.",
    },
    {
        icon: <ProServicesIcon />,
        title: "Professional services",
        description: "Plans for priority support, training and transformation.",
    },
    {
        icon: <BestPracticeIcon />,
        title: "Industry best practices",
        description: "Standardize how teams build across the organization.",
    },
];

type Props = {
    className?: string;
};

export const LandingEnterpriseDevelopers: FC<Props> = ({ className }) => {
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
                    Enterprise developers{" "}
                    <span className="font-sans text-[#FE251B]">❤️</span>{" "}
                    <span
                        className={clsx(
                            "font-semibold",
                            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
                            "text-refine-blue drop-shadow-[0_0_30px_rgba(0,128,255,0.3)]",
                        )}
                    >
                        refine
                    </span>
                    .
                </h2>
                <p
                    className={clsx(
                        "mt-4 landing-sm:mt-6",
                        "max-w-md",
                        "text-base",
                        "dark:text-gray-400 text-gray-600",
                    )}
                >
                    Refine is designed to target the specific pain points of
                    larger organizations for internal tooling.
                </p>
            </div>

            <div
                className={clsx(
                    "mt-8 landing-sm:mt-12 landing-lg:mt-20",
                    "grid",
                    "grid-cols-1 landing-sm:grid-cols-2 landing-lg:grid-cols-3",
                    "gap-4 landing-sm:gap-6",
                )}
            >
                {list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={clsx(
                                "not-prose",
                                "p-4 landing-sm:p-10",
                                "dark:bg-landing-noise",
                                "dark:bg-gray-800 bg-gray-50",
                                "rounded-2xl landing-sm:rounded-3xl",
                            )}
                        >
                            <div>{item.icon}</div>
                            <div
                                className={clsx(
                                    "mt-6",
                                    "text-2xl",
                                    "font-semibold",
                                )}
                            >
                                {item.title}
                            </div>
                            <div
                                className={clsx(
                                    "mt-4",
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
        </div>
    );
};
