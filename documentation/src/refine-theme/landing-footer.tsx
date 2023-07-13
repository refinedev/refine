import clsx from "clsx";
import React from "react";
import { footerDescription, menuItems, socialLinks } from "./footer-data";
import { HeartOutlinedIcon } from "./icons/heart-outlined";
import { RefineLogoIcon } from "./icons/refine-logo";
import { ProductHuntLogo } from "./product-hunt-logo";

export const LandingFooter = () => {
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
                        <RefineLogoIcon className="text-gray-0" />
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
                                        "flex max-w-[304px] flex-col gap-4",
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
                                    "landing-md:col-span-3 landing-lg:col-span-2 max-w-[304px]",
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
                                            refine Dev Corporation{" "}
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
