import React, { useRef, useState } from "react";
import Head from "@docusaurus/Head";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import clsx from "clsx";
import ReactPlayer from "react-player/youtube";
import { CommonLayout } from "@site/src/refine-theme/common-layout";
import { CommonHeader } from "@site/src/refine-theme/common-header";
import { LandingFooter } from "@site/src/refine-theme/landing-footer";

const title = "Refine AI";

type CommonSectionProps = {
  className?: string;
};

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
        </div>

        <div
          style={{
            backgroundRepeat: "repeat, no-repeat, no-repeat",
          }}
          className={clsx(
            "not-prose",
            "relative",
            "bg-refine-ai-page-bg-light",
            "dark:bg-refine-ai-page-bg-dark",
            "dark:bg-[position:0_0,50%_30%]",
            "dark:bg-[length:4px_4px,960px_600px]",
            "bg-[position:0_0,50%_35%,50%_5%]",
            "bg-[length:4px_4px,960px_200px,960px_600px]",
          )}
        >
          <div
            className={clsx(
              "absolute",
              "pointer-events-none",
              "z-[1]",
              "w-[960px]",
              "h-[600px]",
              "left-1/2",
              "top-[350px]",
              "-translate-x-1/2",
              "landing-md:dark:bg-[radial-gradient(46.3%_35.37%_at_50%_35.37%,rgba(38,217,126,0.25)_0%,rgba(38,217,126,0)_100%)]",
              "landing-md:bg-[radial-gradient(46.3%_35.37%_at_50%_35.37%,rgba(51,51,255,0.15)_0%,rgba(51,51,255,0)_100%)]",
            )}
          />
          <Hero
            className={clsx(
              "mx-auto",
              "mt-8 landing-sm:mt-12 landing-md:mt-20",
              "px-6 landing-sm:px-8 landing-md:px-0",
            )}
          />
          <Player
            className={clsx(
              "mx-2 landing-sm:mx-8",
              "mt-8 landing-sm:mt-12 landing-md:mt-20",
            )}
          />
          <JoinTheWaitlistButton
            className={clsx("mt-6", "mb-12 landing-sm:mb-20", "mx-auto")}
          />
        </div>
        <div className="mt-auto">
          <LandingFooter />
        </div>
      </CommonLayout>
    </>
  );
};

const Hero = (props: CommonSectionProps) => {
  return (
    <div
      className={clsx(
        "w-full",
        "not-prose",
        "flex flex-col",
        "items-center",
        props.className,
      )}
    >
      <div>
        <h2
          className={clsx(
            "text-center",
            "text-xs font-semibold",
            "tracking-wider",
            "text-refine-indigo dark:text-refine-green-alt",
            "dark:drop-shadow-[0_0_20px_#26D97F]",
          )}
        >
          ENTERPRISE-READY AI CODE GENERATION
        </h2>
      </div>

      <h1
        className={clsx(
          "pt-6",
          "max-w-[900px]",
          "text-center",
          "tracking-tight",
          "text-[32px] leading-[40px] md:text-[56px] md:leading-[72px]",
          "font-bold",
          "dark:text-white text-gray-900",
        )}
      >
        Build production-grade web applications in minutes, with the power of{" "}
        <span
          className={clsx(
            "text-refine-indigo dark:text-refine-green-alt",
            "dark:drop-shadow-[0_0_30px_#26D97F]",
          )}
        >
          Refine AI
        </span>
        .
      </h1>
    </div>
  );
};

const Player = (props: CommonSectionProps) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [videoState, setVideoState] = useState<"playing" | "paused" | "stop">(
    "stop",
  );

  const showPreview = videoState === "stop";
  const showVideo = videoState === "playing" || videoState === "paused";

  return (
    <div className={clsx(props.className)}>
      <div
        className={clsx(
          "cursor-pointer",
          "relative",
          "z-[5]",
          "w-full max-w-[1200px]",
          "h-auto",
          "mx-auto",
        )}
      >
        <div
          className={clsx(
            "absolute",
            "left-1/2",
            "-translate-x-1/2",
            "h-[1px]",
            "w-[calc(100%-64px)]",
            "z-[6]",
            "bg-gradient-to-r from-[#EDF2F7] dark:from-transparent dark:via-[#26D97F] via-[#3333FF] to-transparent",
          )}
        />

        <div
          className={clsx(
            "relative",
            "z-[5]",
            "bg-gradient-to-b from-[#EDF2F7] dark:from-white/20 via-90% via-transparent",
            "w-full",
            "h-full",
            "p-px",
            "rounded-[32px]",
          )}
        >
          <div
            className={clsx(
              "p-4",
              "bg-white dark:bg-gray-900",
              "dark:bg-gradient-to-b dark:from-white/10 via-transparent",
              "rounded-[32px]",
              "h-full",
            )}
          >
            <div className="aspect-video relative">
              <div
                className={clsx(
                  {
                    "opacity-0": videoState === "stop",
                    "opacity-100": videoState !== "stop",
                  },
                  "rounded-2xl",
                  "overflow-hidden",
                  "h-full w-full",
                )}
              >
                {/* @ts-expect-error ReactPlayer have type issues */}
                <ReactPlayer
                  ref={playerRef}
                  url="https://www.youtube.com/watch?v=mt0loXDwjZo"
                  width="100%"
                  height="100%"
                  controls={false}
                  playing={videoState === "playing"}
                  onEnded={() => {
                    setVideoState("stop");
                  }}
                  onPlay={() => {
                    setVideoState("playing");
                  }}
                  onPause={() => {
                    setVideoState("paused");
                  }}
                />
              </div>

              <div
                className={clsx(
                  {
                    "opacity-0": showVideo,
                    "pointer-events-none": showVideo,
                    "opacity-100": showPreview,
                  },
                  "transition-opacity duration-500 delay-300 ease-in-out",
                  "absolute",
                  "inset-0",
                  "w-full",
                  "h-full",
                  "rounded-2xl",
                )}
              >
                <img
                  src="/assets/refine-ai-video-preview.jpg"
                  alt="Refine AI"
                  className={clsx(
                    "w-full",
                    "h-full",
                    "rounded-2xl",
                    "object-cover",
                  )}
                />
              </div>

              <div
                className={clsx(
                  {
                    "opacity-0": videoState === "playing",
                    "pointer-events-none": videoState === "playing",
                    "opacity-100": videoState !== "playing",
                  },
                  "bg-white/30",
                  "absolute",
                  "inset-0",
                  "rounded-2xl",
                  "transition-all",
                  "duration-200",
                  "ease-in-out",
                )}
              >
                <PlayButton
                  onClick={() => {
                    setVideoState("playing");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayButton = (props: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
      className={clsx(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "flex items-center justify-center",
        "z-[2]",
        "appearance-none",
        "outline-none",
        props.className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={110}
        height={110}
        viewBox="0 0 156 156"
        fill="none"
        className="animate-refine-ai-video-play-button"
      >
        <circle
          cx={78}
          cy={78}
          r={70.2}
          fill="url(#play-button-a)"
          fillOpacity={0.15}
        />
        <path
          fill="url(#play-button-b)"
          fillRule="evenodd"
          d="M60.582 46.972a10.8 10.8 0 0 1 10.928.23l35.1 21.6a10.8 10.8 0 0 1 0 18.396l-35.1 21.6A10.8 10.8 0 0 1 55.05 99.6V56.4a10.8 10.8 0 0 1 5.532-9.428Z"
          clipRule="evenodd"
        />
        <defs>
          <radialGradient
            id="play-button-a"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="matrix(0 140.4 -140.4 0 78 7.8)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8000FF" />
            <stop offset={1} stopColor="#33F" />
          </radialGradient>
          <radialGradient
            id="play-button-b"
            cx={0}
            cy={0}
            r={1}
            gradientTransform="rotate(48.814 -22.496 83.955) scale(86.1042)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ED5EC9" />
            <stop offset={0.3} stopColor="#8000FF" />
            <stop offset={1} stopColor="#33F" />
          </radialGradient>
        </defs>
      </svg>
    </button>
  );
};

const JoinTheWaitlistButton = (props: CommonSectionProps) => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";

  return (
    <BrowserOnly>
      {() => (
        <div
          className={clsx(
            "flex justify-center items-center w-full h-1/2",
            isLight ? "bg-white" : "bg-[#14141F]",
            props.className,
          )}
        >
          <a
            href="https://form.typeform.com/to/htzq03hP"
            target="_blank"
            rel="noreferrer"
            className={clsx(
              "appearance-none",
              "outline-none",
              "border-none",
              "bg-transparent",
              "no-underline",
            )}
          >
            <div
              className={clsx(
                "relative w-[272px] h-24 flex justify-center items-center",
              )}
            >
              <div
                className={clsx(
                  "absolute top-4 left-4",
                  "w-60 h-16",
                  "rounded-[64px]",
                  isLight
                    ? "bg-[rgba(51,51,255,0.75)]"
                    : "bg-[rgba(38,217,127,0.1)]",
                  isLight
                    ? "shadow-[inset_0px_0px_16px_8px_rgba(51,51,255,0.75)]"
                    : "shadow-[inset_0px_0px_16px_8px_rgba(38,217,127,0.1)]",
                )}
                style={{
                  backgroundImage: isLight
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' opacity='0.1' fill='none'%3E%3Cpath fill='%23fff' d='M0 0h2v2H0zM2 2h2v2H2z'/%3E%3C/svg%3E")`
                    : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' opacity='0.25' fill='none'%3E%3Cpath fill='%23000' d='M0 0h2v2H0zM2 2h2v2H2z'/%3E%3C/svg%3E")`,
                }}
              />

              <div
                className={clsx(
                  "absolute top-0 left-0",
                  "w-[272px] h-24",
                  "rounded-[96px]",
                  "border",
                  isLight ? "border-[#DEE5ED]" : "border-[#303450]",
                )}
                style={{
                  background: isLight
                    ? "linear-gradient(180deg, rgba(244, 248, 251, 0.5) 0%, rgba(244, 248, 251, 0) 100%)"
                    : "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              />

              {[false, true].map((isBlurred, index) => (
                <div
                  key={index}
                  className={clsx(
                    "absolute top-[15px] left-[15px]",
                    "block w-[242px] h-[66px]",
                    "rounded-[66px] overflow-hidden",
                    isBlurred && "z-10 blur",
                  )}
                  style={{
                    mask: `url("data:image/svg+xml,%3Csvg width='242' height='66' viewBox='0 0 242 66' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 33C0 14.7746 14.7746 0 33 0H209C227.225 0 242 14.7746 242 33C242 51.2254 227.225 66 209 66H33C14.7746 66 0 51.2254 0 33ZM33 2C15.8792 2 2 15.8792 2 33C2 50.1208 15.8792 64 33 64H209C226.121 64 240 50.1208 240 33C240 15.8792 226.121 2 209 2H33Z' fill='black'/%3E%3C/svg%3E%0A")`,
                  }}
                >
                  <div
                    className={clsx(
                      "absolute -top-[88px] left-0",
                      "w-[242px] h-[242px]",
                      "animate-[spin_8s_linear_infinite]",
                    )}
                    style={{
                      background: isLight
                        ? "conic-gradient(from 270deg at 50% 50%, rgba(51, 51, 255, 0) 0deg, rgba(51, 51, 255, 0) 144deg, #3333FF 179.96deg, rgba(51, 51, 255, 0) 180deg, rgba(51, 51, 255, 0) 324deg, #3333FF 360deg)"
                        : "conic-gradient(from 270deg at 50% 50%, rgba(38,217,127, 0) 0deg, rgba(38,217,127, 0) 144deg, #26D97F 179.96deg, rgba(38,217,127, 0) 180deg, rgba(38,217,127, 0) 324deg, #26D97F 360deg)",
                    }}
                  />
                </div>
              ))}

              <button
                className={clsx(
                  "relative z-10",
                  "w-60 h-16",
                  "rounded-[64px]",
                  "font-medium text-2xl leading-8",
                  "font-inter",
                  "appearance-none",
                  "bg-transparent border border-transparent",
                  isLight ? "text-white" : "text-[#26D97F]",
                )}
                style={{
                  textShadow: isLight
                    ? "0px -8px 8px #3333FF, 0px 8px 8px #3333FF"
                    : "0px -8px 8px rgba(38,217,127,0.5), 0px 8px 8px rgba(38,217,127,0.5)",
                }}
              >
                Join the waitlist
              </button>
            </div>
          </a>
        </div>
      )}
    </BrowserOnly>
  );
};

export default RefineAIPage;
