import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
    splitNavbarItems,
    useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import SearchBar from "@theme/SearchBar";
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
import NavbarSearch from "@theme/Navbar/Search";
import styles from "./styles.module.css";
function useNavbarItems() {
    // TODO temporary casting until ThemeConfig type is improved
    return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
    return (
        <>
            {items.map((item, i) => (
                <NavbarItem
                    {...item}
                    className={`text-[#2A2A42] hover:text-[#2a2a42] hover:no-underline hoverline-link ${item.className} p-0`}
                    key={i}
                />
            ))}
        </>
    );
}
function NavbarContentLayout({ left, right }) {
    return (
        <div className="navbar__inner">
            <div className="navbar__items flex gap-0 lg:gap-3 xl:gap-6 font-montserrat font-semibold with-hoverline">
                {left}
            </div>
            <div className="navbar__items navbar__items--right flex gap-3">
                {right}
            </div>
        </div>
    );
}
export default function NavbarContent() {
    const mobileSidebar = useNavbarMobileSidebar();
    const items = useNavbarItems();
    const [leftItems, rightItems] = splitNavbarItems(items);
    const searchBarItem = items.find((item) => item.type === "search");
    return (
        <NavbarContentLayout
            left={
                // TODO stop hardcoding items?
                <>
                    {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
                    <NavbarLogo />
                    <NavbarItems items={leftItems} />
                </>
            }
            right={
                // TODO stop hardcoding items?
                // Ask the user to add the respective navbar items => more flexible
                <>
                    <NavbarItems items={rightItems} />
                    <NavbarColorModeToggle
                        className={`${styles.colorModeToggle} navbar-theme-toggle`}
                    />
                    {!searchBarItem && (
                        <NavbarSearch>
                            <SearchBar />
                        </NavbarSearch>
                    )}
                </>
            }
        />
    );
}
