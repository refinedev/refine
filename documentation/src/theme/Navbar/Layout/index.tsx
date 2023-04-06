import React from "react";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";

export default function NavbarLayout({ children }) {
    const mobileSidebar = useNavbarMobileSidebar();
    return (
        <nav
            className={`navbar flex fixed w-full h-16 py-2 px-3 lg:px-9 z-[2] ease-out transition-transform duration-200 shadow-none ${
                mobileSidebar.shown
                    ? "navbar-sidebar--show"
                    : "backdrop-blur-[8px]"
            }`}
        >
            {children}
            <NavbarMobileSidebar />
        </nav>
    );
}
