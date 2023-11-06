import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingCommunity } from "../refine-theme/landing-community";
import { LandingEnterpriseDevelopers } from "../refine-theme/landing-enterprise-developers";
import { LandingTrustedByDevelopers } from "../refine-theme/landing-trusted-by-developers";
import { LandingPackages } from "../refine-theme/landing-packages";
import { LandingAlreadyInvented } from "../refine-theme/landing-already-invented";
import { LandingPureReactCode } from "../refine-theme/landing-pure-react-code";

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
                            "flex flex-col",
                            "gap-16 landing-sm:gap-20 landing-md:gap-28 landing-lg:gap-40",
                            "w-full landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                            "px-8 landing-sm:px-0",
                            "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
                            "mx-auto",
                        )}
                    >
                        <LandingTrustedByDevelopers />
                        <div className={clsx("flex flex-col", "gap-6")}>
                            <LandingPackages />
                            <div
                                className={clsx(
                                    "flex flex-col landing-md:flex-row",
                                    "gap-6",
                                )}
                            >
                                <LandingAlreadyInvented
                                    className={clsx(
                                        "w-full landing-md:w-[50%] landing-lg:w-[538px]",
                                    )}
                                />
                                <LandingPureReactCode
                                    className={clsx(
                                        "w-full landing-md:w-[50%] landing-lg:w-[640px]",
                                    )}
                                />
                            </div>
                        </div>
                        <LandingCommunity />
                        <LandingEnterpriseDevelopers />
                    </div>
                    <LandingFooter />
                </div>
            </CommonLayout>
        </>
    );
}

export default Home;
