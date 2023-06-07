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
                    "border-t-[#2E2E78]",
                    "bg-[#0F0F3D]",
                    "max-w-screen-landing-2xl",
                    "w-full",
                    "px-[88px]",
                    "py-11",
                    "flex flex-col",
                    "gap-9",
                )}
            >
                <div className={clsx()}>
                    <RefineLogoIcon className="text-gray-0" />
                </div>
                <div className={clsx("flex", "items-start", "justify-between")}>
                    <div
                        className={clsx(
                            "text-base",
                            "text-gray-0",
                            "max-w-[300px]",
                            "w-full",
                            "flex-shrink-0",
                        )}
                    >
                        {`Refine is a React-based framework for the rapid development of web applications. It eliminates the repetitive tasks demanded by CRUD operations and provides industry standard solutions.`}
                    </div>
                    <div className={clsx("grid grid-cols-5", "gap-4")}>
                        <div className={clsx("flex flex-col gap-4")}>
                            <div className="text-base font-semibold text-gray-0">
                                Resources
                            </div>
                            <div className="flex flex-col gap-2">
                                {["Getting Started", "Tutorials", "Blog"].map(
                                    (item) => (
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
                                    ),
                                )}
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
                                {["About", "Store"].map((item) => (
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
                        <div className={clsx("col-span-2")}>
                            <div className={clsx("flex flex-col gap-4")}>
                                <div className="text-base font-semibold text-gray-0">
                                    Contact
                                </div>
                                <div
                                    className={clsx("text-base", "text-gray-0")}
                                >
                                    <div className={clsx("opacity-75")}>
                                        Refine Dev Corporation
                                        <br />
                                        256 Chapman Road STE 105-4
                                        <br />
                                        Newark, DE 19702
                                        <br />
                                        <br />
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
            <div
                className={clsx(
                    "border-t",
                    "border-t-[#2E2E78]",
                    "bg-[#0F0F3D]",
                    "max-w-screen-landing-2xl",
                    "w-full",
                    "px-[88px]",
                    "py-6",
                    "flex items-center justify-between",
                )}
            >
                <div className={clsx("text-base", "text-gray-0")}>
                    © 2023, refine from Delaware to wherever you&apos;re with{" "}
                    <HeartOutlinedIcon className="text-refine-red inline ml-2 leading-6" />
                </div>
                <div className={clsx("flex items-center", "gap-4")}>
                    <a
                        href="#"
                        className={clsx(
                            "text-base text-gray-0",
                            "no-underline",
                            "hover:text-gray-0 hover:no-underline",
                        )}
                    >
                        Terms & Conditions
                    </a>
                    <a
                        href="#"
                        className={clsx(
                            "text-base text-gray-0",
                            "no-underline",
                            "hover:text-gray-0 hover:no-underline",
                        )}
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className={clsx(
                            "text-base text-gray-0",
                            "no-underline",
                            "hover:text-gray-0 hover:no-underline",
                        )}
                    >
                        License
                    </a>
                </div>
                <div className={clsx("flex items-center", "gap-4")}>
                    <span className={clsx("text-gray-0", "opacity-75")}>
                        Join us on
                    </span>
                    <a
                        href="#"
                        className={clsx(
                            "text-gray-0",
                            "opacity-75",
                            "no-underline",
                            "hover:no-underline hover:text-gray-0",
                        )}
                    >
                        <FooterGithubIcon />
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
                        <FooterDiscordIcon />
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
                        <FooterRedditIcon />
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
                        <FooterTwitterIcon />
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
                        <FooterLinkedinIcon />
                    </a>
                </div>
            </div>
        </>
    );
};
