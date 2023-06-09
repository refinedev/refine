import React from "react";
import Head from "@docusaurus/Head";
import clsx from "clsx";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingTiles } from "../refine-theme/landing-tiles";
import { LandingHero } from "../refine-theme/landing-hero";
import { LandingStats } from "../refine-theme/landing-stats";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingPlayground } from "../refine-theme/landing-playground";

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
            <CommonLayout>
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
