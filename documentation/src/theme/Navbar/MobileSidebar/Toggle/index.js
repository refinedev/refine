import React from "react";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import IconMenu from "@theme/Icon/Menu";
export default function MobileSidebarToggle() {
    const mobileSidebar = useNavbarMobileSidebar();
    return (
        <button
            onClick={mobileSidebar.toggle}
            onKeyDown={mobileSidebar.toggle}
            aria-label="Navigation bar toggle"
            className="bg-transparent border-0 cursor-pointer px-0 pb-0 pt-0.5 text-[#1890FF] lg:hidden"
            type="button"
            tabIndex={0}
        >
            <svg
                width={24}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 2a2 2 0 0 1 2-2h20a2 2 0 1 1 0 4H2a2 2 0 0 1-2-2Zm0 8a2 2 0 0 1 2-2h20a2 2 0 1 1 0 4H2a2 2 0 0 1-2-2Zm24 8a2 2 0 0 0-2-2H2a2 2 0 1 0 0 4h20a2 2 0 0 0 2-2Z"
                    fill="currentColor"
                />
            </svg>
        </button>
    );
}
