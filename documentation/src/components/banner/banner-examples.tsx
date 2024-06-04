import React, { type FC } from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "@site/src/refine-theme/landing-rainbow-button";
import { RefineLogoSeal } from "@site/src/refine-theme/icons/refine-logo-seal";

type Props = {
  title?: string;
  description?: string;
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
};

export const BannerExamples: FC<Props> = ({
  title = "Open-source Retool alternative for enterprise",
  description = "Build React-based internal tools, dashboards & B2B apps with unmatched flexibility",
  button = {
    text: "Discover Refine",
    href: "https://s.refine.dev/blog-retool?ref=banner-retool-alternative",
    onClick: undefined,
  },
}) => {
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag !== "undefined" &&
      title &&
      description
    ) {
      window.gtag("event", "view_banner", {
        banner_name: "banner-retool-alternative",
        banner_text: title,
        banner_description: description,
      });
    }
  }, [title, description]);
  return (
    <div
      className={clsx(
        "relative",
        "rounded-2xl",
        "p-8",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "not-prose",
        "bg-banner-examples-gray",
      )}
    >
      <h2
        className={clsx(
          "text-2xl",
          "font-semibold",
          "bg-banner-examples-text",
          "bg-clip-text",
          "text-transparent",
        )}
      >
        {title}
      </h2>
      <p className={clsx("mt-2", "text-sm", "text-gray-300")}>{description}</p>
      <LandingRainbowButton
        className={clsx("mt-9")}
        href={button.href}
        onClick={button.onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={clsx("text-gray-900", "text-base", "font-bold")}>
          {button.text}
        </div>
      </LandingRainbowButton>
      <RefineLogoSeal className={clsx("absolute", "bottom-2", "right-2")} />
    </div>
  );
};
