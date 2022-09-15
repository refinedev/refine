import React from "react";
import clsx from "clsx";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
export default function NavbarMobileSidebarLayout({
    header,
    primaryMenu,
    secondaryMenu,
}) {
    const { shown: secondaryMenuShown } = useNavbarSecondaryMenu();
    return (
        <div className="navbar-sidebar h-screen w-full backdrop-blur-[18px] bg-white bg-opacity-50 with-hoverline">
            {header}
            <div
                className={clsx("navbar-sidebar__items", {
                    "navbar-sidebar__items--show-secondary": secondaryMenuShown,
                })}
            >
                <div className="navbar-sidebar__item menu w-full">
                    {primaryMenu}
                </div>
                <div className="navbar-sidebar__item menu w-full">
                    {secondaryMenu}
                </div>
            </div>
        </div>
    );
}
