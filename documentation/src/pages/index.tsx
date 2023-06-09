import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingHero } from "../refine-theme/landing-hero";
import { LandingPlayground } from "../refine-theme/landing-playground";
import { LandingStats } from "../refine-theme/landing-stats";
import { LandingTiles } from "../refine-theme/landing-tiles";
import { LandingMagic } from "../refine-theme/landing-magic";

function Home() {
    React.useEffect(() => {
        // if (typeof window !== "undefined" && window.location.hash) {
        //     const id = window.location.hash.replace("#", "");
        //     const element = document.getElementById(id);
        //     if (element) {
        //         element.scrollIntoView();
        //     }
        // }
        // return () => {
        //     // scroll to top after unmount with set timeout
        //     setTimeout(() => {
        //         if (typeof window !== "undefined" && window.location.hash) {
        //             const id = window.location.hash.replace("#", "");
        //             const element = document.getElementById(id);
        //             if (element) {
        //                 element.scrollIntoView();
        //             }
        //         } else {
        //             window.scrollTo(0, 0);
        //         }
        //     }, 0);
        // };
    }, []);

    return (
        <>
            <Head>
                <html data-active-page="index" />
                <link
                    rel="preload"
                    href="https://refine.new/embed-form"
                    as="document"
                />
            </Head>
            <CommonLayout
                title={`refine | Build your React-based CRUD applications, without constraints!`}
                description="refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design System, an enterprise-level UI toolkit."
            >
                <div className={clsx("bg-refine-bg")}>
                    <div
                        className={clsx(
                            "top-section",
                            "bg-landing-stars",
                            "mb-12",
                            "landing-mask-image-hero-wide",
                        )}
                    >
                        <LandingHeader />
                        <LandingHero />
                    </div>
                    <LandingMagic />
                    <LandingTiles />
                    <LandingPlayground />
                    <LandingStats />
                    <div className="h-[96px] landing-lg:h-[160px]" />
                    <LandingFooter />
                </div>
            </CommonLayout>
        </>
    );
}

export default Home;
