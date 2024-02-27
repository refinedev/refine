import React from "react";
import { LandingSlidingHighlights } from "./landing-sliding-highlights";
import clsx from "clsx";
import { YCombinatorIcon } from "./icons/ycombinator";

export const LandingHeroBottom = () => {
  return (
    <div className="relative min-h-[288px] animation-parent">
      <div
        className={clsx(
          "hidden landing-lg:block",
          "w-full",
          "h-[288px]",
          "-mt-[14px]",
          "bg-refine-bg",
          "landing-mask-image-bg",
        )}
      />
      <div
        className={clsx(
          "block landing-lg:hidden",
          "w-full",
          "h-[288px]",
          "-mt-[14px]",
          "bg-refine-bg",
          "landing-image-bottom-mobile-bg",
          "bg-[length:620px_350px]",
          "landing-sm:bg-[length:720px_316px]",
          "landing-md:bg-[length:1080px_474px]",
          "bg-top",
        )}
      />
      <div
        className={clsx(
          "hidden landing-lg:block",
          "absolute",
          "left-0",
          "bg-landing-video-bottom-line",
          "bg-[length:1920px_327px]",
          "bg-top",
          "top-[-7px]",
          "w-full",
          "h-[288px]",
          "-mt-[14px]",
        )}
      />
      <div
        className={clsx(
          "hidden landing-lg:block",
          "absolute",
          "left-0",
          "bg-landing-video-bottom-line-glow",
          "bg-[length:1920px_327px]",
          "bg-top",
          "top-[-7px]",
          "w-full",
          "h-[288px]",
          "-mt-[14px]",
          "animate-beat",
          "will-change-[opacity]",
        )}
      />
      <div
        className={clsx(
          "z-[1]",
          "block",
          "w-full",
          "-mt-[290px]",
          "landing-sm:-mt-[304px]",
          "landing-lg:-mt-[288px]",
          "relative",
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "flex-col",
            "text-gray-0 text-2xl pt-9",
          )}
        >
          <div
            className={clsx(
              "text-base",
              "landing-md:text-2xl",
              "font-normal",
              "bg-landing-text-bg bg-clip-text",
              "text-transparent",
              "mb-2",
              "landing-md:mb-0",
            )}
          >
            Your application with enterprise-grade
          </div>
          <div className="relative w-[300px]">
            <LandingSlidingHighlights />
          </div>
          <div className="pt-16 landing-md:pt-12">
            <YCombinatorIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
