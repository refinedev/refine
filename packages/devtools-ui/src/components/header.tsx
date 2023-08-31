import React from "react";
import clsx from "clsx";

import { LogoIcon } from "./icons/logo";
import { ContactIcon } from "./icons/contact";
import { NotificationIcon } from "./icons/notification";

export const Header = () => {
    return (
        <div
            className={clsx(
                "re-flex-shrink-0",
                "re-bg-gray-800",
                "re-p-3",
                "re-border-b",
                "re-border-b-gray-700",
                "re-flex",
                "re-w-full",
                "re-gap-5",
                "re-items-center",
                "re-justify-between",
                "re-h-[65px]",
            )}
        >
            <div>
                <LogoIcon />
            </div>
            <div
                className={clsx(
                    "re-flex",
                    "re-items-center",
                    "re-justify-center",
                    "re-gap-2",
                )}
            >
                <div
                    className={clsx(
                        "re-w-10",
                        "re-h-10",
                        "re-text-gray-500",
                        "re-flex",
                        "re-justify-center",
                        "re-items-center",
                    )}
                >
                    <ContactIcon />
                </div>
                <div
                    className={clsx(
                        "re-w-10",
                        "re-h-10",
                        "re-text-gray-500",
                        "re-flex",
                        "re-justify-center",
                        "re-items-center",
                    )}
                >
                    <NotificationIcon />
                </div>
                <div className={clsx("re-pl-2")}>
                    <div
                        className={clsx(
                            "re-w-10",
                            "re-h-10",
                            "re-bg-alt-green",
                            "re-rounded-full",
                        )}
                    />
                </div>
            </div>
        </div>
    );
};
