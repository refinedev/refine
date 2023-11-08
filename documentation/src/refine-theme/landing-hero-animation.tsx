import React from "react";
import clsx from "clsx";
import { LandingHeroViteIcon } from "./icons/landing-hero/vite";
import { LandingHeroGridSvg } from "./icons/landing-hero-grid";
import { LandingHeroCenterSvg } from "./icons/landing-hero-center";
import { LandingHeroBeamSvg } from "./icons/landing-hero-beam";
import { LandingHeroAnimationItem } from "./landing-hero-animation-item";
import { LandingHeroNextjsIcon } from "./icons/landing-hero/nextjs";
import { LandingHeroRemixIcon } from "./icons/landing-hero/remix";
import { LandingHeroMaterialUIIcon } from "./icons/landing-hero/material-ui";
import { LandingHeroAntdIcon } from "./icons/landing-hero/antd";
import { LandingHeroChakraUIIcon } from "./icons/landing-hero/chakra";
import { LandingHeroSupabaseIcon } from "./icons/landing-hero/supabase";
import { LandingHeroNestjsIcon } from "./icons/landing-hero/nestjs";
import { LandingHeroAppwriteIcon } from "./icons/landing-hero/appwrite";
import { LandingHeroGoogleIcon } from "./icons/landing-hero/google";
import { LandingHeroAuth0Icon } from "./icons/landing-hero/auth0";
import { LandingHeroStrapiIcon } from "./icons/landing-hero/strapi";
import { useInView } from "framer-motion";

type ItemType = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    name: string;
    color: string;
};

const platformItems: ItemType[] = [
    {
        name: "Vite",
        icon: LandingHeroViteIcon,
        color: "#ffa800",
    },
    {
        name: "Next.js",
        icon: LandingHeroNextjsIcon,
        color: "#ffffff",
    },
    {
        name: "Remix",
        icon: LandingHeroRemixIcon,
        color: "#ffffff",
    },
];

const uiItems: ItemType[] = [
    {
        name: "Material UI",
        icon: LandingHeroMaterialUIIcon,
        color: "#007FFF",
    },
    {
        name: "Ant Design",
        icon: LandingHeroAntdIcon,
        color: "#148EFF",
    },
    {
        name: "Chakra UI",
        icon: LandingHeroChakraUIIcon,
        color: "#29C6B7",
    },
];

const backendItems: ItemType[] = [
    {
        name: "Supabase",
        icon: LandingHeroSupabaseIcon,
        color: "#3ECF8E",
    },
    {
        name: "NestJS",
        icon: LandingHeroNestjsIcon,
        color: "#E0234E",
    },
    {
        name: "Appwrite",
        icon: LandingHeroAppwriteIcon,
        color: "#FD366E",
    },
];

const authItems: ItemType[] = [
    {
        name: "Google",
        icon: LandingHeroGoogleIcon,
        color: "#EA4335",
    },
    {
        name: "Auth0",
        icon: LandingHeroAuth0Icon,
        color: "#EB5424",
    },
    {
        name: "Strapi",
        icon: LandingHeroStrapiIcon,
        color: "#4945FF",
    },
];

export const LandingHeroAnimation = React.memo(function HeroAnimation() {
    const ref = React.useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [activePlatform, setActivePlatform] = React.useState(0);
    const [activeUI, setActiveUI] = React.useState(0);
    const [activeBackend, setActiveBackend] = React.useState(0);
    const [activeAuth, setActiveAuth] = React.useState(0);

    React.useEffect(() => {
        if (inView) {
            let t1: NodeJS.Timeout | null = null;
            let t2: NodeJS.Timeout | null = null;
            let t3: NodeJS.Timeout | null = null;

            const interval = setInterval(() => {
                if (t1) clearTimeout(t1);
                if (t2) clearTimeout(t2);
                if (t3) clearTimeout(t3);

                setActivePlatform((prev) => (prev + 1) % platformItems.length);
                t1 = setTimeout(() => {
                    setActiveUI((prev) => (prev + 1) % uiItems.length);
                }, 2000);
                t2 = setTimeout(() => {
                    setActiveBackend(
                        (prev) => (prev + 1) % backendItems.length,
                    );
                }, 4000);
                t3 = setTimeout(() => {
                    setActiveAuth((prev) => (prev + 1) % authItems.length);
                }, 6000);
            }, 8000);

            return () => {
                clearInterval(interval);
                if (t1) clearTimeout(t1);
                if (t2) clearTimeout(t2);
                if (t3) clearTimeout(t3);
            };
        }
    }, [inView]);

    return (
        <div ref={ref} className={clsx()}>
            <div className={clsx("relative", "w-min")}>
                <LandingHeroGridSvg
                    className={clsx(
                        "w-[404px]",
                        "h-[360px]",
                        "landing-lg:w-[690px]",
                        "landing-lg:h-[480px]",
                        "left-0",
                        "top-0",
                        "bottom-0",
                        "right-0",
                    )}
                />
                <LandingHeroCenterSvg
                    className={clsx(
                        "absolute",
                        "left-1/2 top-1/2",
                        "-translate-x-1/2 -translate-y-1/2",
                        "z-[1]",
                    )}
                />
                <div
                    className={clsx(
                        "hidden",
                        "landing-lg:flex",
                        "absolute",
                        "left-0",
                        "top-0",
                        "bottom-0",
                        "right-0",
                        "w-full",
                        "h-full",
                        "py-12",
                        "px-[89px]",
                        "flex-col",
                        "items-start",
                        "justify-between",
                    )}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "flex",
                            "items-start",
                            "justify-between",
                        )}
                    >
                        <LandingHeroAnimationItem
                            vertical="top"
                            horizontal="left"
                            section="react platform"
                            {...platformItems[activePlatform]}
                            previousName={
                                platformItems[
                                    (activePlatform -
                                        1 +
                                        platformItems.length) %
                                        platformItems.length
                                ].name ?? platformItems[activePlatform].name
                            }
                            key={platformItems[activePlatform].name}
                        />
                        <LandingHeroAnimationItem
                            vertical="top"
                            horizontal="right"
                            section="ui framework"
                            {...uiItems[activeUI]}
                            previousName={
                                uiItems[
                                    (activeUI - 1 + uiItems.length) %
                                        uiItems.length
                                ].name ?? uiItems[activeUI].name
                            }
                            key={uiItems[activeUI].name}
                        />
                    </div>
                    <div
                        className={clsx(
                            "mt-auto",
                            "w-full",
                            "flex",
                            "items-end",
                            "justify-between",
                        )}
                    >
                        <LandingHeroAnimationItem
                            vertical="bottom"
                            horizontal="left"
                            section="backend"
                            {...backendItems[activeBackend]}
                            previousName={
                                backendItems[
                                    (activeBackend - 1 + backendItems.length) %
                                        backendItems.length
                                ].name ?? backendItems[activeBackend].name
                            }
                            key={backendItems[activeBackend].name}
                        />
                        <LandingHeroAnimationItem
                            vertical="bottom"
                            horizontal="right"
                            section="authentication"
                            {...authItems[activeAuth]}
                            previousName={
                                authItems[
                                    (activeAuth - 1 + authItems.length) %
                                        authItems.length
                                ].name ?? authItems[activeAuth].name
                            }
                            key={authItems[activeAuth].name}
                        />
                    </div>
                </div>
                <LandingHeroBeamSvg
                    className={clsx(
                        "z-[0]",
                        "absolute",
                        "left-1/2",
                        "top-1/2",
                        "-translate-x-1/2",
                        "translate-y-0",
                        "landing-lg:translate-y-16",
                    )}
                />
                <LandingHeroBeamSvg
                    className={clsx(
                        "z-[0]",
                        "absolute",
                        "left-1/2",
                        "top-1/2",
                        "-translate-x-1/2",
                        "translate-y-0",
                        "landing-lg:translate-y-16",
                        "animate-landing-hero-beam-line",
                    )}
                    style={{
                        fillOpacity: 0.2,
                        filter: "drop-shadow(rgb(71, 235, 235) 0px 0px 3px) drop-shadow(rgb(71, 235, 235) 0px 0px 8px)",
                    }}
                />
                <div
                    className={clsx(
                        "-mt-6",
                        "pt-6",
                        "px-6",
                        "overflow-hidden",
                        "absolute",
                        "left-1/2",
                        "-translate-x-1/2",
                        "top-1/2",
                        "landing-lg:top-[calc(50%+64px)]",
                        "translate-y-64",
                    )}
                >
                    <div
                        className={clsx(
                            "relative",
                            "w-40",
                            "h-px",
                            "bg-landing-hero-beam-bottom",
                        )}
                    >
                        <div
                            className={clsx(
                                "animate-landing-hero-beam-bottom",
                                "absolute",
                                "-top-2",
                                "-translate-x-1/2",
                                "left-1/2",
                                "w-full",
                                "pb-[50%]",
                                "rounded-full",
                                "blur-[8px]",
                                "bg-refine-cyan-alt",
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
