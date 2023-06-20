import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import Link from "@docusaurus/Link";

import { POPOVERMENUS } from "../../../../assets/nav-menu";

function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
    const mobileSidebar = useNavbarMobileSidebar();
    // TODO how can the order be defined for mobile?
    // Should we allow providing a different list of items?
    const items = useNavbarItems();

    const listed = items.filter(
        (item) => !item.className?.includes("header-icon-link") && item.label,
    );
    const icons = items.filter((item) =>
        item.className?.includes("header-icon-link"),
    );

    return (
        <ul className="menu__list with-hoverline">
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {POPOVERMENUS.map((item) => (
                    <div key={item.label}>
                        <NavbarItem
                            label={item.label}
                            className="text-[#1890ff] hover:text-[#1890ff] hover:no-underline cursor-default flex text-2xl font-semibold my-6"
                        />
                        <div className="flex items-center ml-8">
                            <div className="flex flex-col gap-2">
                                {item.items.map(
                                    ({ label, icon: Icon, link }) => (
                                        <Link
                                            key={label}
                                            to={link}
                                            className="flex items-center gap-4 hover:no-underline hover:bg-[#eeeef0] group transition rounded-lg p-4"
                                        >
                                            <Icon
                                                className={
                                                    label === "Documents" &&
                                                    `ml-2`
                                                }
                                            />
                                            <span className="text-[#242436]">
                                                {label}
                                            </span>
                                        </Link>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                    {listed.map((item, i) => (
                        <NavbarItem
                            mobile
                            {...item}
                            className={
                                "text-[#1890ff] hover:text-[#1890ff] hover:underline cursor-pointer flex text-2xl font-semibold my-6"
                            }
                            to={item.to}
                            key={i}
                        />
                    ))}
                    <ul className="social-icons gap-4 flex list-none px-0">
                        {icons.map((item, i) => (
                            <NavbarItem
                                mobile
                                {...item}
                                onClick={() => mobileSidebar.toggle()}
                                key={i}
                            />
                        ))}
                    </ul>
                    <div className="h-44 visible sm:hidden"></div>
                </div>
            </div>
        </ul>
    );
}
