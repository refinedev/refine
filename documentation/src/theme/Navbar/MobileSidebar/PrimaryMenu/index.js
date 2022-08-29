import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";

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
        (item) => !item.className?.includes("header-icon-link"),
    );
    const icons = items.filter((item) =>
        item.className?.includes("header-icon-link"),
    );

    return (
        <ul className="menu__list with-hoverline">
            {listed.map((item, i) => (
                <NavbarItem
                    mobile
                    {...item}
                    className={`${
                        typeof window !== "undefined" &&
                        (item.activeBaseRegex
                            ? !!window.location.pathname.match(
                                  new RegExp(item.activeBaseRegex.slice(1, -1)),
                              )
                            : location.pathname.startsWith(item.to))
                            ? "active-item"
                            : ""
                    } block text-center font-montserrat font-semibold text-[#2A2A42] text-lg mb-1 hoveline-link`}
                    onClick={() => mobileSidebar.toggle()}
                    key={i}
                />
            ))}
            <ul className="social-icons flex justify-center gap-4 list-none px-0 pb-2 pt-6">
                {icons.map((item, i) => (
                    <NavbarItem
                        mobile
                        {...item}
                        onClick={() => mobileSidebar.toggle()}
                        key={i}
                    />
                ))}
            </ul>
        </ul>
    );
}
