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
                className={clsx("flex", "justify-center", "gap-3")}
            >
                <RefineLogoIcon className="text-gray-0" />
                {title && (
                    <span
                        className={clsx(
                            "text-base leading-none text-gray-0 font-normal",
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
