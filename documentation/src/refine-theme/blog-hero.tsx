import clsx from "clsx";
import React, { type FC } from "react";

type Props = { className?: string };

export const BlogHero: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "relative",
        "w-full",
        "bg-[radial-gradient(50%_100%_at_50%_0%,#431407_0%,rgba(67,20,7,0)_100%)]",
        "dark:bg-[radial-gradient(50%_100%_at_50%_0%,#431407_0%,rgba(67,20,7,0)_100%)]",
        "bg-[radial-gradient(50%_100%_at_50%_0%,#FED7AA_0%,rgba(254,215,170,0)_100%)]",
        "before:absolute before:inset-0 before:bg-[url('/assets/hero-cubics.svg')] before:bg-cover before:bg-center before:mix-blend-overlay before:pointer-events-none before:z-0",
        className,
      )}
    >
      <div
        className={clsx(
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[656px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "w-full",
          "mx-auto",
          "relative",
        )}
      >
        <div className={clsx("absolute", "top-0", "left-0")}>
          <GlowLeft />
        </div>
        <div className={clsx("absolute", "top-0", "right-0")}>
          <GlowRight />
        </div>
      </div>
      <div
        className={clsx(
          "pt-4 blog-md:pt-12 pb-16 px-6",
          "blog-sm:max-w-[592px]",
          "blog-md:max-w-[656px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "w-full",
          "mx-auto",
          "flex",
          "flex-col",
          "items-start justify-start blog-lg:items-center blog-lg:justify-center",
          "gap-4",
          "not-prose",
          "relative",
          "z-10",
        )}
      >
        <h2
          className={clsx(
            "flex",
            "flex-wrap",
            "gap-2",
            "text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
            "font-semibold",
            "text-zinc-900 dark:text-white",
            "tracking-[-0.02em]",
          )}
        >
          <div className={clsx()}>Refine </div>
          <div
            className={clsx(
              "font-bold",
              "font-jetBrains-mono",
              "text-orange-500 dark:text-orange-400",
            )}
          >
            CORE
          </div>
          <div className={clsx()}>Blog</div>
        </h2>
        <p
          className={clsx(
            "text-base",
            "text-start landing-md:text-center",
            "max-w-[588px]",
            "text-zinc-600 dark:text-zinc-300",
            "pb-2",
          )}
        >
          A resource for Refine, front-end ecosystem, and web development. Here,
          we publish insightful articles that demystify complex concepts,
          explore new trends, and provide helpful tips to enhance your coding
          journey.
        </p>
      </div>
    </div>
  );
};

const GlowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={724}
    height={475}
    viewBox="0 0 724 475"
    fill="none"
  >
    <title>Glow Right</title>
    <g filter="url(#glow-right-a)" opacity={0.25}>
      <path
        fill="#FB923C"
        d="M125.345 354.976 120 349.024l37.329-37.284a283253234.865 283253234.865 0 0 0 709.256-708.383l80.175 89.286-41.071 33.117-739.273 596.1-41.071 33.116Z"
      />
    </g>
    <defs>
      <filter
        id="glow-right-a"
        width={1066.76}
        height={991.619}
        x={0}
        y={-516.643}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_5396_538"
          stdDeviation={60}
        />
      </filter>
    </defs>
  </svg>
);

const GlowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={724}
    height={475}
    viewBox="0 0 724 475"
    fill="none"
  >
    <title>Glow Left</title>
    <g filter="url(#glow-left-a)" opacity={0.25}>
      <path
        fill="#FB923C"
        d="m598.328 354.976 5.344-5.952-37.329-37.284-671.926-671.1-37.329-37.283-80.176 89.286 41.071 33.117 739.274 596.1 41.071 33.116Z"
      />
    </g>
    <defs>
      <filter
        id="glow-left-a"
        width={1066.76}
        height={991.619}
        x={-343.088}
        y={-516.643}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_5396_507"
          stdDeviation={60}
        />
      </filter>
    </defs>
  </svg>
);
