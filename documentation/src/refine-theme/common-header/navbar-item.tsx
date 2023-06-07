import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import { NavbarItemType } from "./constants";

type NavbarItemProps = {
    item: NavbarItemType;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
    const Icon = item.icon;

    return (
        <Link
            key={item.label}
            to={item.href}
            className={clsx(
                "inline-flex items-center gap-2",
                "text-base font-medium text-white",
            )}
        >
            {item.icon && <Icon />}
            {item.label}
        </Link>
    );
};
