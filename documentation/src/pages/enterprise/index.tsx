import Head from "@docusaurus/Head";
import clsx from "clsx";
import React from "react";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { EnterpriseHeroSection } from "@site/src/refine-theme/enterprise-hero-section";
import { EnterpriseGetSupport } from "@site/src/refine-theme/enterprise-get-support";
import { EnterpriseSecurity } from "@site/src/refine-theme/enterprise-secuity";
import { EnterpriseGetInTouchCta } from "@site/src/refine-theme/enterprise-get-in-touch-cta";
import { EnterpriseFlexibility } from "@site/src/refine-theme/enterprise-flexibility";

const Enterprise: React.FC = () => {
    const title = "refine | Open-source Retool for Enterprise";

    return (
        <>
            <Head>
                <html data-active-page="index" />
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <link
                    rel="preload"
                    href="https://refine.new/embed-form"
                    as="document"
                />
            </Head>
            <CommonLayout description="Build React-based internal tools, admin panels, dashboards & B2B apps with unmatched flexibility.">
                <div className={clsx()}>
                    <CommonHeader />
                    <div
                        className={clsx(
                            "flex flex-col",
                            "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
                            "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
                            "mx-auto",
                        )}
                    >
                        <EnterpriseHeroSection
                            className={clsx(
                                "h-auto landing-md:h-[432px]",
                                "mt-8",
                                "px-4 landing-sm:px-0",
                                "landing-lg:pr-12",
                            )}
                        />
                        <EnterpriseGetSupport
                            className={clsx(
                                "mt-12 landing-sm:mt-16 landing-md:mt-24",
                                "px-2 landing-sm:px-0",
                            )}
                        />
                        <EnterpriseSecurity
                            className={clsx(
                                "mt-16 landing-sm:mt-24 landing-md:mt-40",
                                "px-2 landing-sm:px-0",
                            )}
                        />
                        <EnterpriseGetInTouchCta
                            className={clsx(
                                "mt-12 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                                "px-2 landing-sm:px-0",
                            )}
                        />
                        <EnterpriseFlexibility
                            className={clsx(
                                "mt-12 landing-sm:mt-20 landing-md:mt-28 landing-lg:mt-40",
                                "px-2 landing-sm:px-0",
                            )}
                        />
                    </div>
                </div>
            </CommonLayout>
        </>
    );
};

export default Enterprise;
