import React from "react";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
import IconClose from "@theme/Icon/Close";
import NavbarLogo from "@theme/Navbar/Logo";
function CloseButton() {
    const mobileSidebar = useNavbarMobileSidebar();
    return (
        <button
            type="button"
            className="clean-btn navbar-sidebar__close"
            onClick={() => mobileSidebar.toggle()}
        >
            <svg
                width={20}
                height={20}
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.414 5.585a2 2 0 0 1-2.829 0l-4.17-4.171a2 2 0 0 0-2.83 2.828l4.172 4.171a2 2 0 0 1 0 2.829l-4.343 4.342a2 2 0 1 0 2.829 2.829l4.342-4.343a2 2 0 0 1 2.829 0l4.314 4.314a2 2 0 0 0 2.828-2.828l-4.314-4.314a2 2 0 0 1 0-2.829l4.143-4.142a2 2 0 1 0-2.829-2.829l-4.142 4.143Z"
                    fill="#1890FF"
                />
            </svg>
        </button>
    );
}
export default function NavbarMobileSidebarHeader() {
    return (
        <div className="navbar-sidebar__brand">
            <div className="absolute left-5 top-6">
                <CloseButton />
            </div>
            <NavbarLogo className="select-none mx-auto items-center flex min-w-0" />
            {/* <NavbarColorModeToggle className="margin-right--md" /> */}
        </div>
    );
}
