import React from "react";
import Head from "@docusaurus/Head";
import clsx from "clsx";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";
import { AiLandingManageWithEaseScaleWithConfidence } from "@site/src/refine-theme/ai-landing-manage-with-ease-scale-with-confidence";
import { JoinWaitlist } from "@site/src/refine-theme/ai-landing-join-the-waitlist-cta";
import { AiLandingHero } from "@site/src/refine-theme/ai-landing-hero";
import { StepList } from "@site/src/refine-theme/ai-landing-step-list";
import { AiPricingCards } from "@site/src/refine-theme/ai-pricing-cards";
import { AiFaq } from "@site/src/refine-theme/ai-faq";

const title = "Refine AI";

const RefineAIPage = () => {
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
        <div>
          <CommonHeader />

          <AiLandingHero
            contentClassName={clsx(
              "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
              "mx-auto",
            )}
          />

          <div
            className={clsx(
              "flex flex-col",
              "w-full max-w-[592px] landing-sm:max-w-[656px] landing-md:max-w-[896px] landing-lg:max-w-[1200px]",
              "px-2 landing-sm:px-0",
              "pb-12 landing-sm:pb-16 landing-md:pb-20 landing-lg:pb-40",
              "mx-auto",
            )}
          >
            <StepList className="mt-14" />
            <JoinWaitlist className="mt-16" />
            <AiLandingManageWithEaseScaleWithConfidence className="mt-8 landing-sm:mt-20" />
            <AiPricingCards className="mt-28" />
            <AiFaq className="mt-12" />
          </div>

          <div className="mt-auto">
            <LandingFooter />
          </div>
        </div>
      </CommonLayout>
    </>
  );
};

export default RefineAIPage;
