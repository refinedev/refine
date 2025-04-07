import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import React from "react";
import { JoinWaitlist } from "./ai-landing-join-the-waitlist-cta";

export const AiLandingHero = ({
  className,
  contentClassName,
}: {
  className?: string;
  contentClassName?: string;
}) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <div
      className={clsx(
        "max-w-[1200px]",
        "mx-auto",
        "w-full",
        "px-6 py-8",
        "landing-md:h-[560px]",
        "relative",
        "flex",
        "items-center",
        className,
      )}
    >
      <div
        className={clsx(
          "absolute",
          "top-0",
          "left-0",
          "right-0",
          "bottom-0",
          "bg-ai-landing-hero",
          "landing-md:bg-ai-landing-hero-md",
          "dark:bg-ai-landing-hero-dark",
          "dark:landing-md:bg-ai-landing-hero-dark-md",
          "landing-md:blur-lg",
        )}
      />
      <div
        className={clsx("not-prose", "w-full max-w-[620px]", contentClassName)}
      >
        <h2
          className={clsx(
            "font-bold",
            "text-4xl",
            "landing-sm:text-[56px] landing-sm:leading-[72px]",
          )}
        >
          <div
            className={clsx(
              "text-refine-indigo",
              "text-refine-indigo drop-shadow-[0_0_30px_rgba(51,51,255,0.55)]",
              "dark:text-refine-green-alt",
              "dark:text-refine-react-dark-green-alt dark:drop-shadow-[0_0_30px_rgba(38,217,127,0.55)]",
            )}
          >
            AI Coding agents
          </div>
          <div>for building web apps.</div>
        </h2>
        <p
          className={clsx(
            "text-base",
            "text-gray-600",
            "dark:text-gray-200",
            "mt-6",
          )}
        >
          The next-gen approach to build enterprise-ready React-based internal
          tools, admin panels, dashboards & B2B apps with the power of GenAI.
        </p>
        <JoinWaitlist className={clsx("mt-6 landing-md:mt-12")} />
      </div>
      <video
        className={clsx(
          "absolute",
          "right-0",
          "top-10",
          "w-[556px]",
          "object-cover",
          "hidden",
          "landing-md:block",
        )}
        src={
          isDarkTheme
            ? "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-dark.webm"
            : "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-light.webm"
        }
        autoPlay
        muted
        loop
      />
    </div>
  );
};
