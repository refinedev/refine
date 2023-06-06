import React from "react";
import Head from "@docusaurus/Head";
import { LandingHeader } from "../refine-theme/landing-header";
import { CommonLayout } from "../refine-theme/common-layout";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { PlayOutlinedIcon } from "../refine-theme/icons/play-outlined";
import { LandingRainbowButton } from "../refine-theme/landing-rainbow-button";
import { LandingGhostButton } from "../refine-theme/landing-ghost-button";

function Home() {
    React.useEffect(() => {
        return () => {
            // scroll to top after unmount with set timeout
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        };
    }, []);

    return (
        <>
            {/* <Head>
                <html data-page="index" data-customized="true" />
            </Head> */}
            <CommonLayout>
                <div
                    className={clsx(
                        "bg-refine-bg",
                        // "bg-landing-linear-spectrum",
                    )}
                >
                    <div className={clsx("top-section", "bg-landing-stars")}>
                        <LandingHeader />
                        <div
                            className={clsx(
                                "flex flex-col",
                                "justify-center",
                                "gap-8",
                            )}
                        >
                            <div>
                                <h1
                                    className={clsx(
                                        "flex items-center justify-center",
                                        "gap-2",
                                        "flex-col",
                                        "text-[40px] leading-[48px]",
                                    )}
                                >
                                    <span
                                        className={clsx(
                                            "block bg-landing-text-bg bg-clip-text text-transparent",
                                            "font-semibold",
                                        )}
                                    >
                                        Open-source enterprise application
                                        platform
                                    </span>
                                    <span
                                        className={clsx(
                                            "block bg-landing-text-bg bg-clip-text text-transparent",
                                            "font-light",
                                        )}
                                    >
                                        for serious web developers.
                                    </span>
                                </h1>
                            </div>
                            <div
                                className={clsx(
                                    "flex items-center justify-center",
                                    "gap-10",
                                )}
                            >
                                <LandingRainbowButton />
                                <LandingGhostButton />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className={clsx(
                                    "w-full",
                                    "h-[150px]",
                                    "absolute",
                                    "-bottom-[75px]",
                                    "bg-landing-linear-spectrum",
                                    "bg-center",
                                    "bg-no-repeat",
                                    "bg-[length:1920px]",
                                    "blur-[100px]",
                                    "opacity-25",
                                )}
                            ></div>
                            <div
                                className={clsx(
                                    "z-[1]",
                                    "-mt-16",
                                    "max-w-[948px]",
                                    "max-h-[496px]",
                                    "w-full h-full",
                                    "mx-auto",
                                    "bg-landing-hero-video-bg",
                                    "bg-contain bg-no-repeat bg-bottom",
                                    "relative",
                                )}
                            >
                                <video
                                    src="assets/hero-video.mov"
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full mt-auto opacity-[0.99]"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div
                                className={clsx(
                                    "w-full",
                                    "h-[288px]",
                                    "-mt-[14px]",
                                    "bg-refine-bg",
                                    "landing-mask-image-bg",
                                )}
                            />
                            <div
                                className={clsx(
                                    "absolute",
                                    "left-0",
                                    "bg-landing-video-bottom-line",
                                    "bg-[length:1920px_327px]",
                                    "bg-top",
                                    "top-[-7px]",
                                    "w-full",
                                    "h-[288px]",
                                    "-mt-[14px]",
                                )}
                            />
                            <div
                                className={clsx(
                                    "absolute",
                                    "left-0",
                                    "bg-landing-video-bottom-line-glow",
                                    "bg-[length:1920px_327px]",
                                    "bg-top",
                                    "top-[-7px]",
                                    "w-full",
                                    "h-[288px]",
                                    "-mt-[14px]",
                                    "animate-beat",
                                    // "animation-fast-speed",
                                )}
                                style={{}}
                            />
                            <div
                                className={clsx(
                                    "z-[1]",
                                    "block",
                                    "w-full",
                                    "-mt-[280px]",
                                    "relative",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "flex items-center justify-center",
                                        "text-gray-0 text-2xl py-12",
                                    )}
                                >
                                    asdasdasdsa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CommonLayout>
            {/* <Layout
                title={`refine | Build your React-based CRUD applications, without constraints!`}
                description="Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
            >
                <Landing />
            </Layout> */}
        </>
    );
}

export default Home;
