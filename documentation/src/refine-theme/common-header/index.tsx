import React from "react";
import Link from "@docusaurus/Link";
import SearchBar from "@site/src/theme/SearchBar";
import clsx from "clsx";

import { HeaderDiscordIcon } from "../icons/header-discord";
import {
    GithubStarIcon,
    GithubIcon,
    DiscordIcon,
    TwitterIcon,
} from "../icons/popover";
import { RefineLogoIcon } from "../icons/refine-logo";

import { MENU_ITEMS, NavbarItemType } from "./constants";
import { GitHubStar } from "./github-star";
import { MenuItem } from "./menu-item";
import { NavbarItem } from "./navbar-item";
import { NavbarPopoverItem } from "./navbar-popover-item";

export const CommonHeader = () => {
    return (
        <div className={clsx("max-w-[1200px]", "mx-auto", "px-8 py-9")}>
            <div className="flex items-center justify-between">
                <RefineLogoIcon className="text-gray-0" />
                <div className="flex gap-8">
                    {MENU_ITEMS.map((item) => {
                        if (item.isPopover) {
                            return (
                                <NavbarPopoverItem
                                    key={`navbar-${item.label}`}
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
                                                    <p
                                                        className={clsx(
                                                            "ml-4",
                                                            "text-gray-600",
                                                        )}
                                                    >
                                                        If you like refine,
                                                        don’t forget to star us
                                                        on GitHub!
                                                    </p>
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
                                                <p className="text-gray-600">
                                                    Join the party!
                                                </p>
                                                <div className="flex gap-4">
                                                    <Link to="https://github.com/refinedev/refine">
                                                        <GithubIcon />
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
                            />
                        );
                    })}
                </div>
                <div className="flex items-center justify-end gap-8">
                    <SearchBar
                        docSearchButton={{
                            placeholder: "Search",
                        }}
                    />
                    <div className="flex items-center gap-2">
                        <GitHubStar />
                        <HeaderDiscordIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};
