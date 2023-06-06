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
                className={clsx("flex", "items-center justify-center", "gap-3")}
            >
                <RefineLogoIcon className="w-[58px] h-[16px] sm:w-[88px] sm:h-[24px] text-gray-0" />
                {title && (
                    <span
                        className={clsx(
                            "text-xs sm:text-base leading-none text-gray-0 font-normal",
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
