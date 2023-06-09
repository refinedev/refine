import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import { MENU_ITEMS, NavbarItemType } from "./constants";
import {
    GithubStarIcon,
    GithubIcon,
    DiscordIcon,
    TwitterIcon,
} from "../icons/popover";
import { MenuItem } from "./menu-item";
import { NavbarItem } from "./navbar-item";
import { NavbarPopoverItem } from "./navbar-popover-item";

type MenuProps = {
    isPermanentDark?: boolean;
};

export const Menu: React.FC<MenuProps> = ({ isPermanentDark }) => {
    return (
        <>
            {MENU_ITEMS.map((item) => {
                if (item.isPopover) {
                    return (
                        <NavbarPopoverItem
                            key={`navbar-${item.label}`}
                            isPermanentDark={isPermanentDark}
                            item={item}
                        >
                            {item.label === "Open-source" && (
                                <>
                                    <div
                                        className={clsx(
                                            "grid grid-cols-2 gap-4",
                                            "p-4",
                                            "w-[672px]",
                                            " bg-white",
                                        )}
                                    >
                                        {item.items.map((subItem) => (
                                            <MenuItem
                                                key={subItem.label}
                                                isPermanentLight
                                                item={subItem}
                                            />
                                        ))}
                                    </div>
                                    <Link
                                        to="https://github.com/refinedev/refine"
                                        className="no-underline"
                                    >
                                        <div
                                            className={clsx(
                                                "bg-gray-100",
                                                "flex items-center",
                                                "py-4 px-7",
                                            )}
                                        >
                                            <GithubStarIcon />
                                            <div
                                                className={clsx(
                                                    "ml-4",
                                                    "text-gray-600",
                                                )}
                                            >
                                                If you like refine, don’t forget
                                                to star us on GitHub!
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            )}

                            {item.label === "Community" && (
                                <>
                                    <div
                                        className={clsx(
                                            "grid gap-4",
                                            "p-4",
                                            "w-[336px]",
                                            " bg-white",
                                        )}
                                    >
                                        {item.items.map((subItem) => (
                                            <MenuItem
                                                key={subItem.label}
                                                isPermanentLight
                                                item={subItem}
                                            />
                                        ))}
                                    </div>
                                    <div
                                        className={clsx(
                                            "bg-gray-100",
                                            "flex justify-between items-center",
                                            "py-4 px-7",
                                        )}
                                    >
                                        <div className="text-gray-600">
                                            Join the party!
                                        </div>
                                        <div className="flex gap-4">
                                            <Link
                                                to="https://github.com/refinedev/refine"
                                                className={clsx(
                                                    "no-underline",
                                                    "hover:text-inherit",
                                                )}
                                            >
                                                <GithubIcon className="text-[#333333]" />
                                            </Link>
                                            <Link to="https://discord.com/invite/refine">
                                                <DiscordIcon />
                                            </Link>
                                            <Link to="https://twitter.com/refine_dev">
                                                <TwitterIcon />
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )}

                            {item.label === "Company" && (
                                <div
                                    className={clsx(
                                        "grid gap-4",
                                        "p-4",
                                        "w-[336px]",
                                        "bg-white",
                                    )}
                                >
                                    {item.items.map((subItem) => (
                                        <MenuItem
                                            key={subItem.label}
                                            isPermanentLight
                                            item={subItem}
                                        />
                                    ))}
                                </div>
                            )}
                        </NavbarPopoverItem>
                    );
                }

                return (
                    <NavbarItem
                        key={`navbar-${item.label}`}
                        item={item as NavbarItemType}
                        isPermanentDark={isPermanentDark}
                    />
                );
            })}
        </>
    );
};
