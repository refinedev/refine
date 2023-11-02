import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingHeader } from "../refine-theme/landing-header";
import LandingCommunity from "../refine-theme/landing-community";

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
                            "w-full landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1296px]",
                            "px-8 landing-sm:px-0",
                            "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
                            "mx-auto",
                        )}
                    >
                        <LandingCommunity
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
