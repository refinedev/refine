import React from "react";
import clsx from "clsx";
import { LandingHeroGithubStars } from "./landing-hero-github-stars";
import { LandingStartActionIcon } from "./icons/landing-start-action";

import { LandingHeroAnimation } from "./landing-hero-animation";
import { LandingCopyCommandButton } from "./landing-copy-command-button";
import Link from "@docusaurus/Link";
import { LandingArrowRightIcon } from "./icons/landing-arrow-right";
import { LandingAppCrmSvg } from "./icons/landing-app-crm";

const apps = [
    "CRM Application",
    "HR Application",
    "E-Commerce Application",
    "Dev-Ops Dashboard",
];

export const LandingHeroSection = () => {
    const [activeApp, setActiveApp] = React.useState(apps[0]);

    return (
        <div
            className={clsx(
                "flex",
                "flex-col",
                "w-full",
                "gap-4",
                "landing-sm:gap-12",
                "landing-md:gap-[59px]",
                "landing-lg:gap-20",
            )}
        >
            <div
                className={clsx(
                    "px-2 landing-sm:px-0",
                    "flex",
                    "flex",
                    "w-full",
                    "relative",
                    "min-h-[360px]",
                    "landing-lg:min-h-[480px]",
                    "py-4",
                )}
            >
                <div
                    className={clsx(
                        "flex",
                        "flex-col",
                        "justify-center",
                        "gap-6",
                        "z-[1]",
                    )}
                >
                    <LandingHeroGithubStars />
                    <h1
                        className={clsx(
                            "text-[32px] leading-[40px]",
                            "tracking-[-0.5%]",
                            "landing-sm:text-[56px] landing-sm:leading-[72px]",
                            "landing-sm:max-w-[588px]",
                            "landing-sm:tracking-[-2%]",
                            "font-extrabold",
                            "text-gray-900 dark:text-gray-0",
                        )}
                    >
                        Open-source Retool for Enterprise
                    </h1>
                    <p
                        className={clsx(
                            "font-normal",
                            "text-base",
                            "text-gray-600 dark:text-gray-300",
                            "landing-xs:max-w-[384px]",
                        )}
                    >
                        Build React-based internal tools, admin panels,
                        dashboards & B2B apps with unmatched flexibilty.
                    </p>
                    <div
                        className={clsx(
                            "flex",
                            "items-center",
                            "justify-start",
                            "gap-6",
                        )}
                    >
                        <Link
                            to="docs"
                            className={clsx(
                                "self-start",
                                "rounded-3xl",
                                "!text-gray-0 dark:!text-gray-900",
                                "bg-refine-blue dark:bg-refine-cyan-alt",
                                "py-3",
                                "px-10",
                                "flex",
                                "items-center",
                                "justify-center",
                                "gap-2",
                                "hover:!no-underline",
                            )}
                        >
                            <LandingStartActionIcon />
                            <span
                                className={clsx("text-base", "font-semibold")}
                            >
                                Get started
                            </span>
                        </Link>
                        <LandingCopyCommandButton
                            className={clsx("hidden", "landing-sm:block")}
                        />
                    </div>
                </div>
                <div
                    className={clsx(
                        "hidden landing-md:block",
                        "absolute",
                        "top-0",
                        "right-0",
                        "z-[0]",
                    )}
                >
                    <LandingHeroAnimation />
                </div>
            </div>
            <div
                className={clsx(
                    "bg-gray-50 dark:bg-gray-800",
                    "flex",
                    "flex-col",
                    "w-full",
                    "rounded-2xl landing-sm:rounded-[32px]",
                    "gap-2 landing-sm:gap-4",
                    "p-2 landing-sm:p-4",
                    "relative",
                )}
            >
                <div className={clsx("flex", "w-full", "gap-2")}>
                    <div
                        className={clsx(
                            "rounded-3xl",
                            "overflow-y-auto",
                            "scrollbar-hidden",
                            "flex",
                            "items-center",
                            "justify-start",
                            "gap-2",
                            "snap snap-x snap-mandatory",
                            "snap-mandatory",
                            "relative",
                        )}
                    >
                        <div
                            className={clsx(
                                "hidden landing-sm:block",
                                "w-[244px]",
                                "rounded-3xl",
                                "h-full",
                                "bg-gray-200 dark:bg-gray-700",
                                "absolute",
                                "left-0",
                                "top-0",
                                "transition-[background-color,transform]",
                                "duration-150",
                                "ease-out",
                            )}
                            style={{
                                transform: `translateX(${
                                    apps.indexOf(activeApp) * (244 + 8)
                                }px)`,
                            }}
                        />
                        {apps.map((app, index) => (
                            <button
                                key={app}
                                type="button"
                                onClick={(event) => {
                                    setActiveApp(app);
                                    // if index i >= 2
                                    // then scroll to the right
                                    event.currentTarget.parentElement?.scrollTo(
                                        {
                                            left:
                                                index >= 2
                                                    ? index * (244 + 8)
                                                    : 0,
                                            behavior: "smooth",
                                        },
                                    );
                                }}
                                className={clsx(
                                    "z-[1]",
                                    "snap-start",
                                    "last:snap-end",
                                    "appearance-none",
                                    "focus:outline-none",
                                    "border-none",
                                    "flex-1",
                                    "break-keep",
                                    "whitespace-nowrap",
                                    "landing-sm:min-w-[244px]",
                                    "py-2",
                                    "landing-sm:py-3.5",
                                    "px-4",
                                    "rounded-3xl",
                                    "transition-colors",
                                    "ease-in-out",
                                    "duration-150",
                                    activeApp !== app && "bg-transparent",
                                    activeApp === app &&
                                        "bg-gray-200 dark:bg-gray-700",
                                    activeApp !== app &&
                                        "text-gray-600 dark:text-gray-400",
                                    activeApp === app &&
                                        "text-gray-900 dark:text-gray-0",
                                    "landing-sm:bg-transparent",
                                    "dark:landing-sm:bg-transparent",
                                    "transition-colors",
                                    "duration-150",
                                    "ease-out",
                                    "text-xs",
                                    "landing-sm:text-sm",
                                )}
                            >
                                {app}
                            </button>
                        ))}
                    </div>
                    <a
                        href="#"
                        className={clsx(
                            "hover:!no-underline",
                            "w-40",
                            "hidden landing-lg:flex",
                            "py-3.5",
                            "pl-7",
                            "pr-4",
                            "rounded-3xl",
                            "flex",
                            "items-center",
                            "justify-center",
                            "gap-4",
                            "bg-transparent",
                            "border border-solid",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-0",
                        )}
                    >
                        <span className="text-sm">See more</span>
                        <LandingArrowRightIcon />
                    </a>
                </div>
                <div
                    className={clsx(
                        "rounded-lg",
                        "landing-md:rounded-xl",
                        "landing-lg:rounded-2xl",
                        "overflow-hidden",
                        "border border-solid",
                        "border-gray-200 dark:border-transparent",
                        "relative",
                    )}
                >
                    <LandingAppCrmSvg className={clsx("w-full", "h-auto")} />
                    <div
                        className={clsx(
                            "absolute",
                            "top-1/2",
                            "left-1/2",
                            "w-10",
                            "h-10",
                            "flex",
                            "items-center",
                            "justify-center",
                            "pointer-events-none",
                        )}
                    >
                        <div
                            className={clsx(
                                "absolute",
                                "w-3",
                                "h-3",
                                "rounded-full",
                                "left-1/2",
                                "top-1/2",
                                "-translate-x-1/2",
                                "-translate-y-1/2",
                                "bg-landing-hero-xray-dot-center-bg",
                            )}
                        />
                        {[0, 400, 800].map((d) => (
                            <div
                                key={d}
                                className={clsx(
                                    "w-10",
                                    "h-10",
                                    "absolute",
                                    "left-0",
                                    "top-0",
                                    "right-0",
                                    "bottom-0",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "animate-dot-waves",
                                        "rounded-full",
                                        "border-2",
                                        "border-refine-cyan",
                                    )}
                                    style={{
                                        animationDelay: `${d}ms`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className={clsx(
                            "hidden",
                            "landing-lg:block",
                            "absolute",
                            "left-0",
                            "bottom-0",
                            "right-0",
                            "w-full",
                            "h-24",
                            "from-gray-0",
                            "via-gray-0",
                            "to-transparent",
                            "bg-gradient-to-t",
                        )}
                    />
                </div>
                <div
                    className={clsx(
                        "flex",
                        "items-center",
                        "justify-center",
                        "landing-lg:-mb-4",
                    )}
                >
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(
                            "landing-lg:animate-mini-bounce",
                            "landing-lg:mt-[-104px]",
                            // "landing-lg:-translate-y-12",
                            "py-2 landing-sm:py-4",
                            "pl-4 pr-4 landing-sm:pl-6 landing-sm:pr-4",
                            "rounded-[32px] landing-sm:rounded-[48px]",
                            "flex",
                            "items-center",
                            "justify-center",
                            "gap-2",
                            "bg-refine-blue dark:bg-refine-cyan-alt",
                            "bg-opacity-10 dark:bg-opacity-10",
                            "landing-lg:bg-opacity-100 dark:landing-lg:bg-opacity-100",
                            "text-refine-blue dark:text-refine-cyan-alt",
                            "landing-lg:text-gray-0 dark:landing-lg:text-gray-900",
                        )}
                    >
                        <span
                            className={clsx(
                                "text-xs landing-sm:text-base",
                                "font-semibold",
                            )}
                        >
                            See live demo
                        </span>
                        <LandingArrowRightIcon />
                    </a>
                </div>
            </div>
        </div>
    );
};
