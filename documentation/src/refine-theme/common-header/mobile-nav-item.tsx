import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import {
    ChevronDownIcon,
    ChevronRightIcon,
    TwoTonedCloudIcon,
} from "../icons/popover";

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
    const Component = component ?? Link;
    const isCollapseble = open !== undefined && href === undefined;

    return (
        <Component
            className={clsx(
                "w-full",
                "flex justify-between items-center",
                "p-4",
                "border-b border-gray-100",
                "no-underline",
            )}
            {...(href ? { to: href } : {})}
        >
            <div className="text-gray-800 font-semibold">{label}</div>
            {isCollapseble &&
                (open ? <ChevronDownIcon /> : <ChevronRightIcon />)}
            {label === "Cloud" && <TwoTonedCloudIcon />}
        </Component>
    );
};
