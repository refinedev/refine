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
  title = "Refine AI is here!",
  description = "The next-gen approach to build enterprise-ready React-based internal tools apps with the power of GenAI.",
  button = {
    text: "Explore Refine AI",
    href: "https://s.refine.dev/blog-banner-no-image?ref=banner-examples",
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
        rel="noopener"
      >
        <div className={clsx("text-gray-900", "text-base", "font-bold")}>
          {button.text}
        </div>
      </LandingRainbowButton>
      <RefineLogoSeal className={clsx("absolute", "bottom-2", "right-2")} />
    </div>
  );
};
