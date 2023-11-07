import clsx from "clsx";
import React from "react";
import { openFigma } from "../utils/open-figma";
import {
    footerDescription,
    menuItems,
    secondaryMenuItems,
    socialLinks,
} from "./footer-data";
import { HeartOutlinedIcon } from "./icons/heart-outlined";
import { RefineLogoIcon } from "./icons/refine-logo";
import { ProductHuntLogo } from "./product-hunt-logo";
import Link from "@docusaurus/Link";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";
import { PHBadgeIcon } from "./icons/ph-badge";

export const LandingFooter = () => {
    const info = (
        <div
            className={clsx(
                "py-6 landing-lg:py-0",
                "flex",
                "flex-col",
                "gap-4",
                "landing-lg:max-w-[224px]",
            )}
        >
            <div
                className={clsx(
                    "font-semibold",
                    "text-sm",
                    "leading-6",
                    "text-gray-900 dark:text-gray-0",
                )}
            >
                Refine Inc.
            </div>
            <div
                className={clsx(
                    "font-normal",
                    "text-sm",
                    "leading-5",
                    "text-gray-600 dark:text-gray-400",
                )}
            >
                256 Chapman Road STE 105-4 Newark, DE 19702
            </div>
            <a
                href="mailto:info@refine.dev"
                className={clsx(
                    "font-normal",
                    "text-sm",
                    "leading-5",
                    "text-gray-600 dark:text-gray-400",
                    "hover:text-gray-800 dark:hover:text-gray-300",
                    "hover:no-underline",
                )}
            >
                info@refine.dev
            </a>
        </div>
    );

    const social = (
        <div
            className={clsx(
                "py-6 landing-lg:py-0",
                "flex",
                "flex-col",
                "landing-sm:items-end",
            )}
        >
            <div className={clsx("flex", "flex-col", "gap-4")}>
                <div
                    className={clsx(
                        "text-sm",
                        "leading-6",
                        "font-semibold",
                        "text-gray-900 dark:text-gray-0",
                        "landing-lg:text-right",
                    )}
                >
                    Join us on
                </div>
                <div
                    className={clsx(
                        "flex",
                        "items-center",
                        "gap-8",
                        "landing-lg:gap-4",
                        "justify-start",
                    )}
                >
                    {socialLinks.map(({ href, icon: Icon }) => (
                        <a
                            href={href}
                            key={href}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx(
                                "text-gray-600 dark:text-gray-400",
                                "hover:text-gray-800 dark:hover:text-gray-300",
                                "hover:no-underline",
                            )}
                        >
                            <Icon
                                className={clsx(
                                    "w-8 h-8",
                                    "landing-lg:w-6 landing-lg:h-6",
                                )}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <footer className={clsx("w-full")}>
            <div
                className={clsx(
                    "border-t border-t-solid",
                    "border-t-gray-100 dark:border-t-gray-700",
                    "dark:bg-footer-dark-bg",
                )}
            >
                <div
                    className={clsx(
                        "grid",
                        "grid-cols-1",
                        "max-w-screen-landing-md",
                        "landing-lg:max-w-screen-landing-lg",
                        "mx-auto",
                    )}
                >
                    <div
                        className={clsx(
                            "px-4 landing-sm:px-8 landing-lg:px-12",
                            "py-4 landing-lg:py-6",
                            "flex",
                            "items-center",
                            "justify-between",
                        )}
                    >
                        <Link
                            to="/"
                            className={clsx(
                                "hover:no-underline",
                                "text-gray-900 dark:text-gray-0",
                            )}
                        >
                            <RefineLogoSingleIcon />
                        </Link>
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className={clsx("hover:no-underline")}
                        >
                            <PHBadgeIcon
                                className={clsx(
                                    "text-gray-900 dark:text-gray-0",
                                    "fill-gray-100 dark:fill-gray-700",
                                )}
                            />
                        </a>
                    </div>
                    <div
                        className={clsx(
                            "px-4 landing-sm:px-8 landing-lg:px-12",
                            "py-6 landing-lg:pt-8 landing-lg:pb-12",
                            "flex",
                            "flex-row",
                            "flex-wrap",
                            "items-start",
                            "justify-start",
                            "gap-6",
                        )}
                    >
                        <div
                            className={clsx(
                                "hidden",
                                "landing-lg:flex",
                                "max-w-[282px]",
                                "w-full",
                            )}
                        >
                            {info}
                        </div>
                        {menuItems.map((menu) => (
                            <div
                                className={clsx(
                                    "flex flex-col gap-4",
                                    "min-w-[152px]",
                                )}
                                key={menu.label}
                            >
                                <div
                                    className={clsx(
                                        "text-sm",
                                        "leading-6",
                                        "font-semibold",
                                        "text-gray-900 dark:text-gray-0",
                                    )}
                                >
                                    {menu.label}
                                </div>
                                <div
                                    className={clsx(
                                        "flex",
                                        "flex-col",
                                        "gap-2",
                                    )}
                                >
                                    {menu.items.map((item) => (
                                        <a
                                            href={item.href}
                                            key={item.label}
                                            className={clsx(
                                                "text-sm",
                                                "leading-5",
                                                "hover:no-underline",
                                                "text-gray-600 dark:text-gray-400",
                                                "hover:text-gray-800 dark:hover:text-gray-300",
                                            )}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div
                            className={clsx(
                                "hidden",
                                "landing-lg:flex",
                                "ml-auto",
                            )}
                        >
                            {social}
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "px-4 landing-sm:px-8",
                            "grid",
                            "grid-cols-1",
                            "landing-sm:grid-cols-2",
                            "landing-sm:gap-8",
                            "landing-lg:hidden",
                        )}
                    >
                        {info}
                        {social}
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    "border-t border-t-solid",
                    "border-t-gray-100 dark:border-t-gray-700",
                    "bg-gray-50 dark:bg-gray-800",
                )}
            >
                <div
                    className={clsx(
                        "py-6 landing-sm:py-8 landing-lg:py-6",
                        "px-4 landing-sm:px-8 landing-lg:px-12",
                        "grid",
                        "grid-cols-1",
                        "landing-md:grid-cols-2",
                        "gap-8",
                        "max-w-screen-landing-md",
                        "landing-lg:max-w-screen-landing-lg",
                        "mx-auto",
                    )}
                >
                    <div
                        className={clsx(
                            "flex",
                            "flex-col",
                            "landing-sm:flex-row",
                            "gap-4",
                            "items-start",
                            "justify-start",
                        )}
                    >
                        {secondaryMenuItems.map((menu) => (
                            <a
                                href={menu.href}
                                key={menu.label}
                                className={clsx(
                                    "text-sm",
                                    "leading-5",
                                    "font-normal",
                                    "text-gray-600 dark:text-gray-400",
                                    "hover:no-underline",
                                    "hover:text-gray-800 dark:hover:text-gray-300",
                                )}
                            >
                                {menu.label}
                            </a>
                        ))}
                    </div>
                    <div
                        className={clsx(
                            "text-left",
                            "landing-md:text-right",
                            "text-sm",
                            "pr-6 landing-sm:pr-0",
                            "leading-5",
                            "text-gray-900 dark:text-gray-0",
                            "font-normal",
                        )}
                    >
                        {
                            "© 2023, Refine from Delaware to wherever you're with "
                        }
                        <HeartOutlinedIcon
                            className={clsx(
                                "ml-1",
                                "text-refine-red",
                                "inline",
                                "leading-5",
                            )}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
    return (
        <>
            <div
                className={clsx(
                    "border-t",
                    "border-t-refine-landing-footer-border",
                    "bg-refine-landing-footer-bg",
                    "w-full",
                    "py-6",
                    "landing-sm:py-8",
                    "landing-md:py-11",
                    "px-4",
                    "landing-sm:px-8",
                    "landing-md:px-8",
                    "landing-lg:px-12",
                    "landing-xl:px-20",
                )}
            >
                <div
                    className={clsx(
                        "max-w-screen-landing-footer",
                        "w-full",
                        "flex flex-col",
                        "gap-6",
                        "mx-auto",
                    )}
                >
                    <div className={clsx("flex items-center justify-between")}>
                        <RefineLogoIcon
                            className="text-gray-0"
                            onContextMenu={openFigma}
                        />
                        <ProductHuntLogo className="landing-md:block hidden" />
                    </div>
                    <div
                        className={clsx(
                            "flex",
                            "flex-col",
                            "landing-xl:flex-row",
                            "items-start",
                            "justify-between",
                            "landing-lg:gap-8",
                        )}
                    >
                        <div
                            className={clsx(
                                "text-xs",
                                "opacity-75",
                                "landing-lg:opacity-100",
                                "landing-lg:text-base",
                                "text-gray-0",
                                "landing-md:max-w-[304px] w-full",
                                "w-full",
                                "flex-shrink-0",
                                "mb-6",
                                "landing-xl:mb-0",
                            )}
                        >
                            {footerDescription}
                        </div>
                        <ProductHuntLogo
                            className={clsx(
                                "landing-md:hidden block",
                                "mx-auto mb-10",
                            )}
                        />
                        <div
                            className={clsx(
                                "w-full",
                                "landing-lg:w-auto",
                                "landing-md:grid-cols-3 landing-lg:grid-cols-5 grid grid-cols-2",
                                "landing-md:gap-4 gap-10",
                            )}
                        >
                            {menuItems.map((menu) => (
                                <div
                                    className={clsx(
                                        "flex min-w-[144px] max-w-[304px] flex-col gap-4",
                                    )}
                                    key={menu.label}
                                >
                                    <div className="text-gray-0 text-base font-semibold">
                                        {menu.label}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {menu.items.map((item) => (
                                            <a
                                                href={item.href}
                                                key={item.label}
                                                className={clsx(
                                                    "text-base",
                                                    "text-gray-0",
                                                    "opacity-75",
                                                    "hover:opacity-100",
                                                    "hover:no-underline",
                                                    "hover:text-gray-0",
                                                )}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div
                                className={clsx(
                                    "landing-md:col-span-3 landing-lg:col-span-2 w-full landing-content:max-w-[304px]",
                                )}
                            >
                                <div className={clsx("flex flex-col gap-4")}>
                                    <div className="text-gray-0 text-base font-semibold">
                                        Contact
                                    </div>
                                    <div
                                        className={clsx(
                                            "text-base",
                                            "text-gray-0",
                                        )}
                                    >
                                        <div className={clsx("opacity-75")}>
                                            Refine Development Inc.{" "}
                                            <br className="landing-md:hidden landing-xl:inline" />
                                            256 Chapman Road STE 105-4{" "}
                                            <br className="landing-md:hidden landing-xl:inline" />
                                            Newark, DE 19702
                                            <br className="landing-md:hidden landing-xl:inline" />
                                            <br className="landing-md:hidden landing-xl:inline" />
                                        </div>
                                        <a
                                            href="mailto:info@refine.dev"
                                            className={clsx(
                                                "text-gray-0",
                                                "opacity-75",
                                                "hover:opacity-100",
                                                "hover:no-underline",
                                                "hover:text-gray-0",
                                            )}
                                        >
                                            info@refine.dev
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    "border-t",
                    "border-t-refine-landing-footer-border",
                    "bg-refine-landing-footer-bg",
                    "w-full",
                    "px-4",
                    "landing-sm:px-8",
                    "landing-md:px-8",
                    "landing-lg:px-12",
                    "landing-xl:px-20",
                    "py-6",
                )}
            >
                <div
                    className={clsx(
                        "mx-auto",
                        "max-w-screen-landing-footer",
                        "w-full",
                        "landing-lg:gap-2 gap-6",
                        "flex items-center justify-between",
                        "landing-lg:flex-row flex-col-reverse",
                    )}
                >
                    <div className={clsx("text-base", "text-gray-0")}>
                        © 2023, refine from San Francisco to wherever
                        you&apos;re with{" "}
                        <HeartOutlinedIcon className="text-refine-red ml-2 inline leading-6" />
                    </div>
                    <div
                        className={clsx(
                            "flex items-center",
                            "gap-4",
                            "landing-lg:flex-row flex-col",
                            "landing-lg:max-w-none max-w-[382px]",
                        )}
                    >
                        <span
                            className={clsx(
                                "text-gray-0",
                                "landing-lg:text-left text-center opacity-75",
                            )}
                        >
                            Join us on
                        </span>
                        <div
                            className={clsx(
                                "flex",
                                "flex-row",
                                "items-center",
                                "gap-4",
                                "justify-between",
                            )}
                        >
                            {socialLinks.map(({ href, icon: Icon }) => (
                                <a
                                    href={href}
                                    key={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={clsx(
                                        "text-gray-0",
                                        "opacity-75",
                                        "no-underline",
                                        "hover:text-gray-0 hover:no-underline",
                                    )}
                                >
                                    <Icon className="landing-lg:w-6 landing-lg:h-6 h-9 w-9" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
