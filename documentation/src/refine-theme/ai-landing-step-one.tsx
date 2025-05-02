import React from "react";
import "./ai-landing-step-one.css";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

export const AiLandingStepOne = () => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={clsx(
        "relative",
        "w-[436px] h-[362px]",
        "landing-lg:w-[556px]",
        "landing-lg:h-[488px]",
        "overflow-hidden",
        "flex-shrink-0",
        {
          light: colorMode === "light",
          dark: colorMode === "dark",
        },
        "before:content-['']",
        "before:absolute",
        "before:w-[280px]",
        "before:h-[280px]",
        "before:rounded-full",
        "before:backdrop-blur-[1px]",
        "before:blur-[4px]",
        "before:top-[104px]",
        "before:left-[154px]",
        "before:z-[2]",
      )}
    >
      <div
        className={clsx(
          "w-[412px] h-[360px]",
          "landing-lg:w-[556px]",
          "landing-lg:h-[488px]",
          "overflow-hidden",
          "relative",
          "z-1",
          "before:content-['']",
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:h-[2660px]",
          "before:w-[412px]",
          "landing-lg:before:w-[556px]",
          "before:animate-[ai-landing-step-one-panUp_40s_linear_infinite]",
          "before:bg-no-repeat",
          "before:bg-[length:556px_2660px]",
          "light:before:bg-[url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-landing-step-one-light.png')]",
          "dark:before:bg-[url('https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-landing-step-one-dark.png')]",
        )}
        style={{
          maskImage:
            "radial-gradient(50% 50% at 50% 50%, #ffffff 25%, rgba(255, 255, 255, 0) 100%)",
          WebkitMaskImage:
            "radial-gradient(50% 50% at 50% 50%, #ffffff 25%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <div
        className={clsx(
          "absolute",
          "z-[3]",
          "top-0",
          "left-0",
          "w-full h-full",
          "flex flex-col items-center justify-center",
        )}
      >
        <div className={clsx("z-[3]")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="112"
            height="112"
            fill="none"
            className="ai-landing-step-one-addIcon"
          >
            <g
              className={clsx("dark:text-refine-green-alt text-refine-indigo")}
            >
              <g filter="url(#ai-landing-step-one-a)">
                <rect
                  width="96"
                  height="96"
                  x="8"
                  y="8"
                  fill="currentColor"
                  fillOpacity=".1"
                  rx="32"
                />
              </g>
              <g filter="url(#ai-landing-step-one-b)">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M56 48v16m8-8H48m-11 0c0-8.957 0-13.435 2.782-16.218C42.566 37 47.044 37 56 37s13.435 0 16.218 2.782C75 42.566 75 47.044 75 56s0 13.435-2.782 16.218C69.435 75 64.957 75 56 75s-13.435 0-16.218-2.782C37 69.435 37 64.957 37 56Z"
                />
              </g>
            </g>
            <defs>
              <filter
                id="ai-landing-step-one-a"
                width="96"
                height="96"
                x="8"
                y="8"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="8" />
                <feComposite
                  in2="hardAlpha"
                  k2="-1"
                  k3="1"
                  operator="arithmetic"
                />
                <feColorMatrix
                  values={
                    colorMode === "dark"
                      ? "0 0 0 0 0.14902 0 0 0 0 0.85098 0 0 0 0 0.498039 0 0 0 0.2 0"
                      : "0 0 0 0 0.2 0 0 0 0 0.2 0 0 0 0 1 0 0 0 0.2 0"
                  }
                />
                <feBlend in2="shape" result="effect1_innerShadow_7012_8880" />
              </filter>
              <filter
                id="ai-landing-step-one-b"
                width="57"
                height="57"
                x="27.5"
                y="27.5"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="4" />
                <feColorMatrix
                  values={
                    colorMode === "dark"
                      ? "0 0 0 0 0.14902 0 0 0 0 0.85098 0 0 0 0 0.498039 0 0 0 0.2 0"
                      : "0 0 0 0 0.2 0 0 0 0 0.2 0 0 0 0 1 0 0 0 0.2 0"
                  }
                />
                <feBlend
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_7012_8880"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_7012_8880"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <span
          className={clsx(
            "block",
            "text-[#6c7793]",
            "text-[16px]",
            "leading-[24px]",
            "text-center",
            "w-[200px]",
            "z-[3]",
          )}
        >
          Start building together with Refine AI
        </span>
      </div>

      <ul
        className={clsx(
          "ai-landing-step-one-files",
          "absolute",
          "overflow-visible",
          "m-0",
          "p-0",
          "top-0",
          "left-0",
          "z-[4]",
          "w-full",
          "h-full",
          "list-none",
        )}
      >
        <ListItem className="ai-landing-step-one-figma">design.fig</ListItem>
        <ListItem className="ai-landing-step-one-pdf">api.pdf</ListItem>
        <ListItem className="ai-landing-step-one-ss">screenshot.png</ListItem>
        <ListItem className="ai-landing-step-one-json">endpoint.json</ListItem>
      </ul>
    </div>
  );
};

const ListItem = ({
  children,
  className,
}: { children: React.ReactNode; className: string }) => {
  return (
    <li
      className={clsx(
        "flex",
        "flex-row",
        "justify-center",
        "items-center",
        "gap-[8px]",
        "pt-[8px]",
        "pr-[16px]",
        "pb-[8px]",
        "pl-[8px]",
        "rounded-[8px]",
        "bg-[#303450]",
        "absolute",
        "origin-center",
        "text-white",
        "whitespace-nowrap",
        "before:content-['']",
        "before:block",
        "before:w-[24px]",
        "before:h-[24px]",
        className,
      )}
    >
      {children}
    </li>
  );
};
