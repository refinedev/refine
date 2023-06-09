import clsx from "clsx";
import React from "react";
import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterGithubIcon } from "./icons/footer-github";
import { FooterLinkedinIcon } from "./icons/footer-linkedin";
import { FooterRedditIcon } from "./icons/footer-reddit";
import { FooterTwitterIcon } from "./icons/footer-twitter";

export const CommonFooter = () => {
    return (
        <footer
            className={clsx(
                "py-5",
                "px-6",
                "dark:bg-gray-800 bg-gray-100",
                "border-t dark:border-t-gray-700 border-t-gray-100",
            )}
        >
            <div
                className={clsx(
                    "max-w-[1644px] mx-auto",
                    "flex w-full items-center justify-between",
                    "flex-col-reverse sm:flex-row",
                )}
            >
                <div
                    className={clsx(
                        "text-base",
                        "font-light",
                        "dark:text-gray-400 text-gray-700",
                        "mt-4 sm:mt-0",
                    )}
                >
                    refine © 2023
                </div>

                <div
                    className={clsx(
                        "flex flex-col sm:flex-row justify-center items-center",
                    )}
                >
                    <div
                        className={clsx(
                            "dark:text-gray-400 text-gray-700",
                            "text-xs sm:text-base",
                            "font-light",
                            "sm:mr-4",
                        )}
                    >
                        Join us on
                    </div>
                    <div
                        className={clsx(
                            "flex gap-10 sm:gap-5",
                            "dark:text-gray-500 text-gray-400",
                            "mt-4 sm:mt-0",
                        )}
                    >
                        <div className={clsx("flex items-center gap-4")}>
                            <FooterGithubIcon
                                className={clsx("w-9 h-9 sm:w-6 sm:h-6")}
                            />
                        </div>
                        <div className={clsx("flex items-center gap-4")}>
                            <FooterDiscordIcon
                                className={clsx("w-9 h-9 sm:w-6 sm:h-6")}
                            />
                        </div>
                        <div className={clsx("flex items-center gap-4")}>
                            <FooterRedditIcon
                                className={clsx("w-9 h-9 sm:w-6 sm:h-6")}
                            />
                        </div>
                        <div className={clsx("flex items-center gap-4")}>
                            <FooterTwitterIcon
                                className={clsx("w-9 h-9 sm:w-6 sm:h-6")}
                            />
                        </div>
                        <div className={clsx("flex items-center gap-4")}>
                            <FooterLinkedinIcon
                                className={clsx("w-9 h-9 sm:w-6 sm:h-6")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
