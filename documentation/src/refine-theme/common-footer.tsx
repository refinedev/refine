import clsx from "clsx";
import React from "react";
import { GithubIcon } from "./icons/github";

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
                    "flex w-full items-center justify-between",
                    "flex-col md:flex-row",
                )}
            >
                <div
                    className={clsx(
                        "text-base",
                        "font-light",
                        "dark:text-gray-400 text-gray-700",
                    )}
                >
                    Refine © 2023
                </div>
                <div
                    className={clsx(
                        "dark:text-gray-400 text-gray-700",
                        "text-base",
                        "font-light",
                        "flex",
                        "gap-2",
                    )}
                >
                    <span>Join us on</span>
                    <div className={clsx("flex items-center gap-4")}>
                        <GithubIcon className={clsx("w-6 h-6")} />
                    </div>
                </div>
            </div>
        </footer>
    );
};
