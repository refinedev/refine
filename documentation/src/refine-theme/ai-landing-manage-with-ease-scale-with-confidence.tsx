import React from "react";
import clsx from "clsx";
import { AiLandingCard } from "./ai-landing-card";
import {
  AiLandingPackagesDesktop,
  AiLandingPackagesMobile,
} from "./ai-landing-packages";

export const AiLandingManageWithEaseScaleWithConfidence = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={clsx("not-prose", className)}>
      <h2
        className={clsx(
          "text-2xl",
          "landing-sm:text-[32px]",
          "landing-sm:leading-10",
          "tracking-tight",
          "text-start",
          "pl-4 landing-sm:pl-10",
          "dark:text-gray-0 text-gray-900",
        )}
      >
        Manage with{" "}
        <span
          className={clsx(
            "font-semibold",
            "dark:text-refine-yellow dark:drop-shadow-[0_0_30px_rgba(249,213,31,0.75)]",
            "text-refine-purple drop-shadow-[0_0_30px_rgba(179,102,255,1)]",
          )}
        >
          ease
        </span>
        , scale with{" "}
        <span
          className={clsx(
            "font-semibold",
            "dark:text-refine-react-dark-green-alt dark:drop-shadow-[0_0_30px_rgba(38,217,127,0.55)]",
            "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.55)]",
          )}
        >
          <span className="block landing-md:inline">
            confidence
            <span className={clsx("text-gray-900", "dark:text-white")}>.</span>
          </span>
        </span>
      </h2>

      <div
        className={clsx(
          "flex",
          "flex-col",
          "gap-8 landing-sm:gap-12 landing-md:gap-6",
          "mt-8 landing-sm:mt-12",
        )}
      >
        <div
          className={clsx(
            "grid",
            "grid-cols-1 landing-md:grid-cols-2",
            "gap-8 landing-sm:gap-12 landing-md:gap-6",
          )}
        >
          <AiLandingCard
            imageUrl={{
              dark: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/production-grade-results-dark.png",
              light:
                "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/production-grade-results-light.png",
            }}
            title="Production-grade results"
            description="Refine AI uses popular Refine framework under the hood to generate production ready applications easy to read and maintain for developers."
          />
          <AiLandingCard
            imageUrl={{
              dark: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/no-black-box-dark.png",
              light:
                "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/no-black-box-light.png",
            }}
            title="No black-box"
            description="Output is 100% pure React code, it's yours to modify and use however you prefer."
          />
        </div>

        <AiLandingPackagesDesktop
          className={clsx("hidden", "landing-lg:block")}
        />

        <div
          className={clsx(
            "grid",
            "grid-cols-1 landing-md:grid-cols-2 landing-lg:grid-cols-3",
            "gap-8 landing-sm:gap-12 landing-md:gap-6",
          )}
        >
          <AiLandingPackagesMobile
            className={clsx("block", "landing-lg:hidden")}
          />

          <AiLandingCard
            imageUrl={{
              dark: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/best-developer-experience-dark.png",
              light:
                "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/best-developer-experience-light.png",
            }}
            title="Best developer experience"
            description="Web based IDE featuring blazing fast live previews, file editor and powerful conversation tools including rollbacks."
            imageClassName={clsx("landing-lg:!aspect-[352/208]")}
          />
          <AiLandingCard
            imageUrl={{
              dark: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/1-click-deployments-dark.png",
              light:
                "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/1-click-deployments-light.png",
            }}
            title="1-Click deployments"
            description="Deploy your project to Netlify with single click, without requiring a Netlify account or prior setup."
            imageClassName={clsx("landing-lg:!aspect-[352/208]")}
          />
          <AiLandingCard
            imageUrl={{
              dark: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/your-preference-of-ui-framework-dark.png",
              light:
                "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/your-preference-of-ui-framework-light.png",
            }}
            title="Your preference of UI framework"
            description="Works with MUI or Ant Design. Tailwind support coming soon."
            imageClassName={clsx("landing-lg:!aspect-[352/208]")}
          />
        </div>
      </div>
    </div>
  );
};
