import React from "react";
import { useReward } from "react-rewards";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";

const ProductHuntIcon = (props) => (
    <svg
        width={16}
        height={16}
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

const LaunchTomorrow = () => {
    return (
        <div className="bg-[#6813CB] bg-opacity-70 backdrop-blur h-8 font-montserrat flex items-center justify-center text-[10px] sm:text-sm font-medium text-white uppercase gap-1">
            <span>WE’LL BE LAUNCHING ON</span>
            <ProductHuntIcon />
            <span className="font-bold">PRODUCT HUNT</span>
            <span className="pr-0.5">😺</span>
            <span>
                <a
                    className="text-white underline"
                    href="https://www.producthunt.com/upcoming/refine-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    TOMORROW
                </a>
            </span>
        </div>
    );
};

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
    });

    React.useEffect(() => {
        if (localStorage.getItem("ph-launch-announcement") !== "true") {
            setTimeout(() => {
                reward();
                localStorage.setItem("ph-launch-announcement", "true");
            }, 500);
        }
    }, []);

    return (
        <div className="bg-[#6813CB] bg-opacity-70 backdrop-blur h-8 font-montserrat flex items-center justify-center text-[10px] sm:text-sm font-medium text-white uppercase gap-1">
            <span>IT’S THE LAUNCH DAY ON</span>
            <ProductHuntIcon />
            <span className="font-bold">PRODUCT HUNT</span>
            <span className="pr-0.5">😺</span>
            <span>
                JOIN US{" "}
                <a
                    className="text-white underline"
                    href="https://www.producthunt.com/products/refine-3"
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
    const { scrollY: _scrollY } = useScroll({
        smooth: 0,
    });

    const { siteConfig } = useDocusaurusContext();

    const { customFields } = siteConfig;

    const { announcementStatus } = customFields;

    const animatedAnnouncementStatus = useMotionValue(
        announcementStatus === "tomorrow" || announcementStatus === "today"
            ? 1
            : 0,
    );

    React.useEffect(() => {
        if (
            announcementStatus === "today" ||
            announcementStatus === "tomorrow"
        ) {
            animatedAnnouncementStatus.set(1);
        } else {
            animatedAnnouncementStatus.set(0);
        }
    }, []);

    const scrollY = useTransform<number, number>(
        [animatedAnnouncementStatus, _scrollY],
        ([status, scroll]) => {
            if (status === 1) {
                return scroll;
            } else {
                return 0;
            }
        },
    );

    const yCustomized = useTransform(scrollY, [96, 128], [0, -32]);

    const yRest = useTransform(scrollY, [0, 32], [0, -32]);

    const hasAnnouncement =
        announcementStatus === "tomorrow" || announcementStatus === "today";

    return (
        <>
            <Head>
                {hasAnnouncement ? <body className="has-announcement" /> : null}
            </Head>
            <motion.nav
                className={`navbar p-0 flex flex-col fixed w-full ${
                    hasAnnouncement ? "h-24" : "h-16"
                } z-[2] ease-out transition-transform duration-200 shadow-none ${
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
