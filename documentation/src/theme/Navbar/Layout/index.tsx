import React from "react";
import { useReward } from "react-rewards";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";

const ProductHuntIcon = (props) => (
    <svg
        width={18}
        height={18}
        viewBox="0 0 16 16"
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

const productHuntSvgString = `<svg
 width="24"
 height="24"
 viewBox="0 0 16 16"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 >
 <path
     fill-rule="evenodd"
     clip-rule="evenodd"
     d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Z"
     fill="#EA532A"
 />
 <path
     fill-rule="evenodd"
     clip-rule="evenodd"
     d="M8.998 8.235h-2.24v-2.4h2.24c.655 0 1.186.538 1.186 1.2 0 .663-.531 1.2-1.186 1.2Zm0-4H5.177v8h1.58v-2.4h2.24c1.529 0 2.768-1.253 2.768-2.8 0-1.546-1.24-2.8-2.767-2.8Z"
     fill="#fff"
 />
 </svg>`;

const LaunchToday = () => {
    const { reward } = useReward("navbar__confetti", "emoji", {
        emoji: ["⭐", "❤️", productHuntSvgString],
        angle: -90,
        spread: 180,
        position: "absolute",
        elementCount: 100,
        startVelocity: 30,
        decay: 0.93,
        lifetime: 500,
        onAnimationComplete: () => {
            if (typeof window !== "undefined") {
                localStorage.setItem("ph-launch-announcement", "true");
            }
        },
    });

    React.useEffect(() => {
        if (localStorage.getItem("ph-launch-announcement") !== "true") {
            setTimeout(() => {
                reward();
            }, 500);
        }
    }, []);

    return (
        <div className="bg-[#2E2E38] text-[12px] leading-[16px] py-2 px-2 h-8 flex items-center justify-center font-normal text-white gap-4">
            <span className="text-[16px]">🚨‍️</span>
            <span>It’s the launch day on Product Hunt</span>
            <ProductHuntIcon />
            <span>
                <a
                    className="text-white underline font-bold"
                    href="https://www.producthunt.com/posts/refine-new"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Join us here!
                </a>
            </span>
            <span className="text-[16px]">🚨‍️</span>
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

    return (
        <>
            <Head>
                <body className="has-announcement" />
            </Head>
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
                {announcementStatus === "today" ? <LaunchToday /> : null}
                <div className="sticky top-0 flex w-full h-16 py-2 px-3 lg:px-9">
                    {children}
                </div>
                {/* <NavbarBackdrop onClick={mobileSidebar.toggle} /> */}
                <NavbarMobileSidebar />
            </motion.nav>
            <motion.nav
                id="navbar-customized"
                className={`navbar navbar--customized p-0 flex flex-col fixed w-full h-24 z-[2] ease-out transition-transform duration-200 shadow-none ${
                    mobileSidebar.shown
                        ? "navbar-sidebar--show"
                        : "backdrop-blur-[8px]"
                }`}
                style={{
                    y: yCustomized,
                }}
            >
                {announcementStatus === "today" ? <LaunchToday /> : null}
                <div className="sticky top-0 flex w-full h-16 py-2 px-3 lg:px-9">
                    {children}
                </div>
                {/* <NavbarBackdrop onClick={mobileSidebar.toggle} /> */}
                <NavbarMobileSidebar />
            </motion.nav>
            <div
                id="navbar__confetti"
                style={{
                    position: "absolute",
                    left: "50vh",
                    top: 0,
                    zIndex: 999,
                }}
            />
        </>
    );
}
