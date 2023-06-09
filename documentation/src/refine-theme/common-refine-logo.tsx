import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import { RefineLogoIcon } from "./icons/refine-logo";

interface Props {
    title?: string;
    className?: string;
}

export const RefineLogo = ({ title, className }: Props) => {
    return (
        <div className={clsx("flex", "items-center", className)}>
            <Link
                to="/docs"
                className={clsx(
                    "flex",
                    "items-center justify-center",
                    "gap-3",
                    "no-underline",
                )}
            >
                <RefineLogoIcon
                    className={clsx(
                        "text-gray-900 dark:text-gray-0",
                        "w-[58px] h-[16px] sm:w-[88px] sm:h-[24px]",
                    )}
                />
                {title && (
                    <span
                        className={clsx(
                            "text-gray-500 dark:text-gray-0",
                            "text-xs sm:text-base leading-none font-normal",
                            "mt-1.5",
                        )}
                    >
                        Documentation
                    </span>
                )}
            </Link>
        </div>
    );
};
