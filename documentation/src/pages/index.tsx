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
import { LandingWalkthrough } from "../refine-theme/landing-walkthrough";

function Home() {
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
                title={`refine | Open-source Retool for Enterprise`}
                description="Build React-based internal tools, admin panels, dashboards & B2B apps with unmatched flexibilty."
            >
                <div className={clsx("bg-refine-bg")}>
                    <LandingHeader />
                    <div
                        className={clsx(
                            "top-section",
                            "bg-landing-stars",
                            "mb-12 -mt-[100px] md:-mt-[110px] lg:-mt-[90px] xl:-mt-[110px]",
                            "pt-[100px] lg:pt-[90px] xl:-pt-[110px]",
                            "landing-mask-image-hero-wide",
                        )}
                    >
                        <LandingHero />
                    </div>
                    <LandingWalkthrough />
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
