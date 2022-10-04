import React from "react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
    useHideableNavbar,
    useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const ProductHuntIcon = (props) => (
    <svg
        width={16}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z"
            fill="#EA532A"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.998 8.235h-2.24v-2.4h2.24c.655 0 1.186.538 1.186 1.2 0 .663-.531 1.2-1.186 1.2Zm0-4H5.177v8h1.58v-2.4h2.24c1.529 0 2.768-1.253 2.768-2.8 0-1.546-1.24-2.8-2.767-2.8Z"
            fill="#fff"
        />
    </svg>
);

const LaunchTomorrow = () => {
    return (
        <div className="bg-[#6813CB] bg-opacity-70 backdrop-blur h-8 font-montserrat flex items-center justify-center text-sm font-medium text-white uppercase gap-1">
            <span>WE’LL BE LAUNCHING ON</span>
            <ProductHuntIcon />
            <span className="font-bold">PRODUCT HUNT</span>
            <span className="pr-0.5">😺</span>
            <span>TOMORROW</span>
        </div>
    );
};

const LaunchToday = () => {
    return (
        <div className="bg-[#6813CB] bg-opacity-70 backdrop-blur h-8 font-montserrat flex items-center justify-center text-sm font-medium text-white uppercase gap-1">
            <span>IT’S THE LAUNCH DAY ON</span>
            <ProductHuntIcon />
            <span className="font-bold">PRODUCT HUNT</span>
            <span className="pr-0.5">😺</span>
            <span>
                JOIN US{" "}
                <a
                    className="text-white underline"
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    HERE!
                </a>
            </span>
        </div>
    );
};

export default function NavbarLayout({ children }) {
    const mobileSidebar = useNavbarMobileSidebar();
    const { scrollY } = useScroll({
        smooth: 0,
    });

    const { siteConfig } = useDocusaurusContext();

    const { customFields } = siteConfig;

    const { announcementStatus } = customFields;

    const yCustomized = useTransform(scrollY, [96, 128], [0, -32]);

    const yRest = useTransform(scrollY, [0, 32], [0, -32]);

    React.useEffect(() => {
        if (
            announcementStatus === "tomorrow" ||
            announcementStatus === "today"
        ) {
            if (typeof document !== "undefined") {
                document.body.classList.add("has-announcement");
            }
        }
    }, [announcementStatus]);

    return (
        <>
            <motion.nav
                className={`navbar navbar--rest p-0 flex flex-col fixed w-full h-24 z-[2] ease-out transition-transform duration-200 shadow-none ${
                    mobileSidebar.shown
                        ? "navbar-sidebar--show"
                        : "backdrop-blur-[8px]"
                }`}
                style={{
                    y: yRest,
                }}
            >
                {announcementStatus === "tomorrow" ? <LaunchTomorrow /> : null}
                {announcementStatus === "today" ? <LaunchToday /> : null}
                <div className="sticky top-0 flex w-full h-16 py-2 px-3 lg:px-9">
                    {children}
                </div>
                {/* <NavbarBackdrop onClick={mobileSidebar.toggle} /> */}
                <NavbarMobileSidebar />
            </motion.nav>
            <motion.nav
                className={`navbar navbar--customized p-0 flex flex-col fixed w-full h-24 z-[2] ease-out transition-transform duration-200 shadow-none ${
                    mobileSidebar.shown
                        ? "navbar-sidebar--show"
                        : "backdrop-blur-[8px]"
                }`}
                style={{
                    y: yCustomized,
                }}
            >
                {announcementStatus === "tomorrow" ? <LaunchTomorrow /> : null}
                {announcementStatus === "today" ? <LaunchToday /> : null}
                <div className="sticky top-0 flex w-full h-16 py-2 px-3 lg:px-9">
                    {children}
                </div>
                {/* <NavbarBackdrop onClick={mobileSidebar.toggle} /> */}
                <NavbarMobileSidebar />
            </motion.nav>
        </>
    );
}
