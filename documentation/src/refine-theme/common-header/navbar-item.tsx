import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import { NavbarItemType } from "./constants";
import { TwoTonedCloudIcon } from "../icons/popover";

type NavbarItemProps = {
    item: NavbarItemType;
    isPermanentDark?: boolean;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({
    item,
    isPermanentDark,
}) => {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || null);
        window.addEventListener("storage", storageEventHandler, false);

        return () => {
            window.removeEventListener("storage", storageEventHandler, false);
        };
    }, []);

    const storageEventHandler = () => {
        setTheme(localStorage.getItem("theme") || null);
    };

    let Icon = item.icon;

    if (item.label === "Cloud") {
        Icon = theme === "light" ? TwoTonedCloudIcon : item.icon;
    }

    if (isPermanentDark) {
        Icon = item.icon;
    }

    return (
        <Link
            key={item.label}
            to={item.href}
            className={clsx(
                "inline-flex items-center gap-2",
                "text-base font-medium text-gray-900 dark:text-white",
                "no-underline",
                isPermanentDark && "!text-white",
                item.label === "Hackathon"
                    ? [
                          "py-1",
                          "px-2",
                          "rounded-lg",
                          "bg-hackathon-button-bg",
                          "animate-hackathon-button-bg",
                          "bg-refine-bg",
                          "text-gray-0",
                          "bg-[length:200%_100%]",
                          "text-[14px]",
                      ]
                    : [],
            )}
        >
            {item.icon && <Icon />}
            {item.label}
        </Link>
    );
};
