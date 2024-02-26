import React from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "./landing-rainbow-button";
import { LandingGhostButton } from "./landing-ghost-button";

export const LandingHeroTop = () => {
  return (
    <div
      className={clsx(
        "pt-10",
        "landing-sm:pt-4",
        "landing-lg:pt-6",
        "flex flex-col",
        "justify-center",
        "gap-10",
        "landing-md:gap-16",
        "landing-lg:gap-8",
        "mt-4",
      )}
    >
      <div>
        <h1
          className={clsx(
            "flex items-center justify-center",
            "flex-col",
            "gap-2",
            "text-[24px] leading-[32px]",
            "landing-md:gap-0",
            "landing-md:text-[32px] landing-md:leading-[40px]",
            "landing-lg:gap-2",
            "landing-lg:text-[40px] landing-lg:leading-[48px]",
          )}
        >
          <span
            className={clsx(
              "text-center",
              "block bg-landing-text-bg bg-clip-text text-transparent",
              "font-semibold",
            )}
          >
            Open-source Retool for <br className="inline landing-md:hidden" />
            Enterprise
          </span>
          <span
            className={clsx(
              "text-base sm:text-xl xl:text-2xl",
              "max-w-[328px] sm:max-w-[480px] xl:max-w-max",
              "text-center",
              "block bg-landing-text-bg bg-clip-text text-transparent",
              "font-light",
            )}
          >
            Build your internal tools, admin panels, dashboards, B2B apps with
            flexibility in mind.
          </span>
        </h1>
      </div>
      <div
        className={clsx(
          "flex items-center justify-center",
          "flex-col landing-sm:flex-row",
          "gap-6",
          "landing-sm:gap-8",
          "landing-lg:gap-10",
        )}
      >
        <LandingRainbowButton href="/#playground" />
        <LandingGhostButton />
      </div>
    </div>
  );
};
