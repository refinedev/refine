import React from "react";
import clsx from "clsx";
import { LandingHeroItemNodeSvg } from "./icons/landing-hero-item-node";
import {
  ChangingTextElement,
  type ChangingTextElementRef,
} from "./changing-text-element";

type ItemProps = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
  previousName?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  section: string;
  name: string;
  color: string;
  rayClassName?: string;
};

const hexToAlpha = (hex: string, alpha: number) => {
  const alphaHex = Math.round(alpha * 255).toString(16);
  return hex + alphaHex;
};

export const LandingHeroAnimationItem = React.memo(
  function ItemBase({
    vertical,
    horizontal,
    previousName,
    icon: Icon,
    section,
    name,
    color,
    rayClassName,
  }: ItemProps) {
    const ref = React.useRef<ChangingTextElementRef>(null);

    React.useEffect(() => {
      if (ref.current) {
        ref.current.start();
      }
    }, [name]);

    return (
      <div
        className={clsx(
          "min-w-[207px]",
          "rounded-[64px]",
          "bg-gray-0",
          "dark:bg-gray-900",
          "dark:bg-opacity-50",
          "border",
          "border-solid",
          "border-gray-300",
          "dark:border-gray-700",
          "flex",
          "items-center",
          "justify-between",
          "relative",
          horizontal === "right" ? "flex-row-reverse" : "flex-row",
        )}
      >
        <div
          className={clsx(
            "flex-shrink-0",
            "w-[64px]",
            "h-[62px]",
            "relative",
            "animate-opacity-reveal",
          )}
          key={name}
        >
          <Icon
            className="light:!drop-shadow-none"
            style={{
              transform: "translateZ(0)",
              filter: `drop-shadow(0px 0px 20px ${hexToAlpha(
                color,
                0.75,
              )}) drop-shadow(0px 0px 30px ${hexToAlpha(color, 0.5)})`,
            }}
          />
        </div>
        <div
          className={clsx(
            "flex-1",
            "py-[14px]",
            horizontal === "left" && ["pr-6"],
            horizontal === "right" && ["pl-6"],
          )}
        >
          <div
            className={clsx(
              "font-disket",
              "font-bold",
              "text-gray-500",
              "uppercase",
              "text-xs",
              horizontal === "left" && "text-left",
              horizontal === "right" && "text-right",
            )}
          >
            {section}
          </div>
          <div
            className={clsx(
              "font-medium",
              "text-xs",
              "text-gray-900",
              "dark:text-transparent",
              "dark:bg-clip-text",
              "dark:bg-landing-hero-item-name-gradient",
              horizontal === "left" && "text-left",
              horizontal === "right" && "text-right",
            )}
          >
            <ChangingTextElement
              ref={ref}
              first={previousName ?? name}
              second={name}
              tick={50}
            />
          </div>
        </div>
        <LandingHeroItemNodeSvg
          className={clsx(
            "stroke-gray-300",
            "fill-gray-400",
            "dark:fill-gray-500",
            "dark:stroke-gray-700",
            "absolute",
            horizontal === "right"
              ? "-scale-x-100 right-7"
              : "scale-x-100 left-7",
            vertical === "bottom"
              ? "-scale-y-100 bottom-full -mb-px"
              : "scale-y-100 top-full -mt-px",
          )}
        />
        <div
          className={clsx(
            "w-[172px]",
            "h-[100px]",
            "absolute",
            "overflow-hidden",
            "z-[1]",
            horizontal === "right"
              ? "-scale-x-100 right-7"
              : "scale-x-100 left-7",
            vertical === "bottom"
              ? "-scale-y-100 bottom-full -mb-px"
              : "scale-y-100 top-full -mt-px",
          )}
          style={{
            maskType: "alpha",
            WebkitMaskImage:
              "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
            maskImage:
              "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
          }}
        >
          <div
            key={name}
            className={clsx(
              "w-[calc(172px*2)]",
              "h-[calc(172px*2)]",
              "left-0",
              "top-0",
              "absolute",
              "animate-beam-spin",
              "will-change-transform",
              "bg-landing-hero-beam-bg",
              rayClassName,
            )}
            style={{
              color,
            }}
          />
        </div>
      </div>
    );
  },
  (p, n) => p.name === n.name,
);
