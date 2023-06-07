import React from "react";
import Head from "@docusaurus/Head";
import clsx from "clsx";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingHeroTop } from "../refine-theme/landing-hero-top";
import { LandingHeroVideo } from "../refine-theme/landing-hero-video";
import { LandingHeroBottom } from "../refine-theme/landing-hero-bottom";

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
            <Head>
                <html data-active-page="index" />
            </Head>
            <CommonLayout>
                <div
                    className={clsx(
                        "bg-refine-bg",
                        // "bg-landing-linear-spectrum",
                    )}
                >
                    <div className={clsx("top-section", "bg-landing-stars")}>
                        <LandingHeader />
                        <LandingHeroTop />
                        <LandingHeroVideo />
                        <LandingHeroBottom />
                    </div>
                </div>
            </CommonLayout>
        </>
    );
}

export default Home;
