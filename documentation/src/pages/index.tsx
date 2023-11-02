import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";
import { LandingHeader } from "../refine-theme/landing-header";
import { LandingPackages } from "../refine-theme/landing-packages";

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
                            "max-w-[1296px]",
                            "w-full",
                            "p-2 landing-sm:p-12",
                            "mx-auto",
                        )}
                    >
                        <LandingPackages
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
