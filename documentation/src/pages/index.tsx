import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingCommunity } from "../refine-theme/landing-community";
import LandingEnterpriseDevelopers from "../refine-theme/landing-enterprise-developers";
import { LandingTrustedByDevelopers } from "../refine-theme/landing-trusted-by-developers";
import { LandingPackages } from "../refine-theme/landing-packages";
import { LandingHeroSection } from "../refine-theme/landing-hero-section";
import { LandingTryItSection } from "../refine-theme/landing-try-it-section";

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
                title={`refine | Build your React-based CRUD applications, without constraints!`}
                description="refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. It ships with Ant Design, an enterprise-level UI toolkit."
            >
                <div className={clsx()}>
                    <LandingHeader />
                    <div
                        className={clsx(
                            "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                            "px-2 landing-sm:px-0",
                            "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
                            "mx-auto",
                        )}
                    >
                        <LandingHeroSection
                            className={clsx(
                                "mt-0",
                                "landing-sm:mt-8",
                                "landing-lg:mt-20",
                            )}
                        />
                        {/* <LandingTrustedByDevelopers
                            className={clsx(
                                "mt-16 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                            )}
                        />
                        <LandingPackages
                            className={clsx(
                                "mt-16 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                            )}
                        />
                        <LandingCommunity
                            className={clsx(
                                "mt-16 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                            )}
                        />
                        <LandingEnterpriseDevelopers
                            className={clsx(
                                "mt-16 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                            )}
                        /> */}
                        <LandingTryItSection
                            className={clsx(
                                "mt-16 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                            )}
                        />
                    </div>
                    <LandingFooter />
                </div>
            </CommonLayout>
        </>
    );
}

export default Home;
