import clsx from "clsx";
import React from "react";
import { HeartOutlinedIcon } from "./icons/heart-outlined";
import { FooterGithubIcon } from "./icons/footer-github";
import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterRedditIcon } from "./icons/footer-reddit";
import { FooterTwitterIcon } from "./icons/footer-twitter";
import { FooterLinkedinIcon } from "./icons/footer-linkedin";
import { RefineLogoIcon } from "./icons/refine-logo";

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
                        "max-w-screen-landing-2xl",
                        "w-full",
                        "flex flex-col",
                        "gap-6",
                        "landing-sm:gap-4",
                        "landing-md:gap-9",
                        "mx-auto",
                    )}
                >
                    <div className={clsx()}>
                        <RefineLogoIcon className="text-gray-0" />
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
                                "landing-xl:max-w-[300px]",
                                "w-full",
                                "flex-shrink-0",
                                "mb-6",
                                "landing-xl:mb-0",
                            )}
                        >
                            {`Refine is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by CRUD operations and provides industry standard solutions.`}
                            <div className="mt-4 w-fit mx-auto landing-xl:mx-0">
                                <a
                                    href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=dark&period=daily"
                                        alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt"
                                        style={{
                                            width: "200px",
                                            height: "42px",
                                        }}
                                        width="250"
                                        height="54"
                                    />
                                </a>
                            </div>
                        </div>
                        <div
                            className={clsx(
                                "w-full",
                                "landing-lg:w-auto",
                                "grid grid-cols-2 landing-md:grid-cols-3 landing-lg:grid-cols-5",
                                "gap-4",
                            )}
                        >
                            <div className={clsx("flex flex-col gap-4")}>
                                <div className="text-base font-semibold text-gray-0">
                                    Resources
                                </div>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "Getting Started",
                                        "Tutorials",
                                        "Blog",
                                    ].map((item) => (
                                        <a
                                            href="#"
                                            key={item}
                                            className={clsx(
                                                "text-base",
                                                "text-gray-0",
                                                "opacity-75",
                                                "hover:opacity-100",
                                                "hover:no-underline",
                                                "hover:text-gray-0",
                                            )}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className={clsx("flex flex-col gap-4")}>
                                <div className="text-base font-semibold text-gray-0">
                                    Product
                                </div>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "Examples",
                                        "Integrations",
                                        "Become an Expert",
                                        "Cloud",
                                    ].map((item) => (
                                        <a
                                            href="#"
                                            key={item}
                                            className={clsx(
                                                "text-base",
                                                "text-gray-0",
                                                "opacity-75",
                                                "hover:opacity-100",
                                                "hover:no-underline",
                                                "hover:text-gray-0",
                                            )}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className={clsx("flex flex-col gap-4")}>
                                <div className="text-base font-semibold text-gray-0">
                                    Company
                                </div>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "About",
                                        "Store",
                                        "Terms & Conditions",
                                        "Privacy Policy",
                                        "License",
                                    ].map((item) => (
                                        <a
                                            href="#"
                                            key={item}
                                            className={clsx(
                                                "text-base",
                                                "text-gray-0",
                                                "opacity-75",
                                                "hover:opacity-100",
                                                "hover:no-underline",
                                                "hover:text-gray-0",
                                            )}
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={clsx(
                                    "landing-md:col-span-3 landing-lg:col-span-2",
                                )}
                            >
                                <div className={clsx("flex flex-col gap-4")}>
                                    <div className="text-base font-semibold text-gray-0">
                                        Contact
                                    </div>
                                    <div
                                        className={clsx(
                                            "text-base",
                                            "text-gray-0",
                                        )}
                                    >
                                        <div className={clsx("opacity-75")}>
                                            Refine Dev Corporation{" "}
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
                        "max-w-screen-landing-2xl",
                        "w-full",
                        "gap-6 landing-lg:gap-2",
                        "flex items-center justify-between",
                        "flex-col-reverse landing-lg:flex-row",
                    )}
                >
                    <div className={clsx("text-base", "text-gray-0")}>
                        © 2023, refine from Delaware to wherever you&apos;re
                        with{" "}
                        <HeartOutlinedIcon className="text-refine-red inline ml-2 leading-6" />
                    </div>
                    <div
                        className={clsx(
                            "flex items-center",
                            "gap-4",
                            "flex-col landing-lg:flex-row",
                            "max-w-[382px] landing-lg:max-w-none",
                        )}
                    >
                        <span
                            className={clsx(
                                "text-gray-0",
                                "opacity-75 text-center landing-lg:text-left",
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
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-0",
                                    "opacity-75",
                                    "no-underline",
                                    "hover:no-underline hover:text-gray-0",
                                )}
                            >
                                <FooterGithubIcon className="w-9 h-9 landing-lg:w-6 landing-lg:h-6" />
                            </a>
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-0",
                                    "opacity-75",
                                    "no-underline",
                                    "hover:no-underline hover:text-gray-0",
                                )}
                            >
                                <FooterDiscordIcon className="w-9 h-9 landing-lg:w-6 landing-lg:h-6" />
                            </a>
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-0",
                                    "opacity-75",
                                    "no-underline",
                                    "hover:no-underline hover:text-gray-0",
                                )}
                            >
                                <FooterRedditIcon className="w-9 h-9 landing-lg:w-6 landing-lg:h-6" />
                            </a>
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-0",
                                    "opacity-75",
                                    "no-underline",
                                    "hover:no-underline hover:text-gray-0",
                                )}
                            >
                                <FooterTwitterIcon className="w-9 h-9 landing-lg:w-6 landing-lg:h-6" />
                            </a>
                            <a
                                href="#"
                                className={clsx(
                                    "text-gray-0",
                                    "opacity-75",
                                    "no-underline",
                                    "hover:no-underline hover:text-gray-0",
                                )}
                            >
                                <FooterLinkedinIcon className="w-9 h-9 landing-lg:w-6 landing-lg:h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
