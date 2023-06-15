import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import {
    ChevronDownIcon,
    ChevronRightIcon,
    TwoTonedCloudIcon,
} from "../icons/popover";
import { CloudIcon } from "../icons/cloud";
import { HackathonAltIcon } from "../icons/hackathon-alt";

type MobileNavItemProps = {
    label: string;
    href?: string;
    open?: boolean;
    component?: React.FC;
};

export const MobileNavItem: React.FC<MobileNavItemProps> = ({
    label,
    href,
    component,
    open,
}) => {
    const [theme, setTheme] = useState(null);

    const Component = component ?? Link;
    const isCollapseble = open !== undefined && href === undefined;

    useEffect(() => {
        const currentTheme = document
            .querySelector("html")
            .getAttribute("data-theme");
        setTheme(currentTheme);
    }, []);

    return (
        <Component
            className={clsx(
                "w-full",
                "flex justify-between items-center",
                "p-4",
                "border-b border-gray-100 dark:border-gray-700",
                "no-underline",
            )}
            {...(href ? { to: href } : {})}
        >
            <div className="text-gray-800 dark:text-white font-semibold">
                {label === "Hackathon" && (
                    <HackathonAltIcon className="inline text-[#F93] -mt-1 mr-1.5" />
                )}
                {label}
            </div>
            {isCollapseble &&
                (open ? <ChevronDownIcon /> : <ChevronRightIcon />)}
            {label === "Cloud" &&
                (theme === "light" ? <TwoTonedCloudIcon /> : <CloudIcon />)}
        </Component>
    );
};
