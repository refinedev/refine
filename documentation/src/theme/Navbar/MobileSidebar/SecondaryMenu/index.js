import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarSecondaryMenu } from "@docusaurus/theme-common/internal";
import { ChevronLeft } from "../../../../components/blog/icons";

function SecondaryMenuBackButton(props) {
    return (
        <button
            {...props}
            type="button"
            className="clean-btn navbar-sidebar__back pl-0 mb-4 ml-2.5 w-[calc(100%-20px)] flex items-center border-y border-y-[#9696B4] border-solid border-x-0"
        >
            <ChevronLeft className="w-7 h-7" /> Return to main menu
        </button>
    );
}
// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu() {
    const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
    const secondaryMenu = useNavbarSecondaryMenu();
    return (
        <>
            {/* edge-case: prevent returning to the primaryMenu when it's empty */}
            {!isPrimaryMenuEmpty && (
                <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
            )}
            {secondaryMenu.content}
        </>
    );
}
