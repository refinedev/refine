import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import { NavbarPopoverItemType } from "./constants";

type MenuItemProps = {
    item: NavbarPopoverItemType["items"][0];
};

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
    const Icon = item.icon;

    return (
        <Link to={item.link} className="no-underline">
            <div
                className={clsx(
                    "flex items-center",
                    "p-4",
                    "transition duration-150 ease-in-out",
                    "rounded-lg",
                    "hover:bg-gray-50",
                )}
            >
                <div className="shrink-0">
                    <Icon />
                </div>
                <div className="ml-2">
                    <p className={clsx("text-gray-900", "font-semibold")}>
                        {item.label}
                    </p>
                    <p className={clsx("text-gray-500", "text-xs")}>
                        {item.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};
