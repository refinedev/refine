import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import React from "react";
import { JoinWaitlist } from "./ai-landing-join-the-waitlist-cta";
import BrowserOnly from "@docusaurus/BrowserOnly";

export const AiLandingHero = ({
  className,
  contentClassName,
}: {
  className?: string;
  contentClassName?: string;
}) => {
  return (
    <div
      className={clsx(
        "max-w-[1200px]",
        "mx-auto",
        "w-full",
        "landing-md:px-0",
        "px-6",
        "py-8",
        "landing-md:h-[400px]",
        "landing-lg:h-[560px]",
        "relative",
        "flex",
        "items-center",
        "justify-start",
        className,
        "z-[2]",
      )}
    >
      <div
        className={clsx(
          "z-[1]",
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
        className={clsx(
          "not-prose",
          "w-full max-w-[620px]",
          "z-[2]",
          contentClassName,
        )}
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
            Instant React Dashboards
          </div>
          <div>straight from your APIs.</div>
        </h2>
        <p
          className={clsx(
            "text-base",
            "text-gray-600",
            "dark:text-gray-200",
            "mt-6",
            "max-w-[588px]",
          )}
        >
          Powered by AI, secure by default and fully React. Export or deploy
          whenever you’re ready.
        </p>
        <JoinWaitlist className={clsx("mt-6 landing-md:mt-12", "mx-0")} />
      </div>
      <BrowserOnly>{() => <Video />}</BrowserOnly>
    </div>
  );
};

const Video = () => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <video
      key={colorMode}
      className={clsx(
        "z-[2]",
        "absolute",
        "hidden",
        "top-10",
        "landing-md:block",
        "landing-md:w-[278px]",
        "landing-md:right-[150px]",
        "landing-lg:right-0",
        "landing-lg:w-[556px]",
        "object-cover",
      )}
      autoPlay={true}
      muted={true}
      loop={true}
      playsInline={true}
      controls={false}
    >
      <source
        type='video/mp4; codecs="hvc1"'
        src={
          isDarkTheme
            ? "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-dark.mov"
            : "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-light.mov"
        }
      />
      <source
        type="video/webm;"
        src={
          isDarkTheme
            ? "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-dark.webm"
            : "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-hero-video-light.webm"
        }
      />
    </video>
  );
};
