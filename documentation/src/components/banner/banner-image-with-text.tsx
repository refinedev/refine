import React, { type FC } from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "@site/src/refine-theme/landing-rainbow-button";
import { RefineLogoSeal } from "@site/src/refine-theme/icons/refine-logo-seal";
import { ArrowRightIcon } from "@site/src/refine-theme/icons/arrow-right";
import Link from "@docusaurus/Link";

type Props = {
  title?: string;
  description?: string;
  variant?: "gray" | "purple";
  image?: {
    src?: string;
    alt?: string;
    href?: string;
  };
  button?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  bannerName: string;
};

export const BannerImageWithText: FC<Props> = ({
  title,
  description,
  image,
  variant = "purple",
  button = {
    text: "Learn more",
    href: "https://refine.dev/",
    onClick: undefined,
  },
  bannerName,
}) => {
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag !== "undefined" &&
      bannerName
    ) {
      window.gtag("event", "view_banner", {
        banner_name: bannerName,
        banner_text: title,
        banner_description: description,
        banner_image: image.src,
      });
    }
  }, [bannerName]);

  return (
    <div
      className={clsx(
        "relative",
        "rounded-2xl",
        "p-6",
        "flex",
        "flex-col 2xl:flex-row",
        "items-center",
        "gap-4 2xl:gap-10",
        "not-prose",
        variant === "gray" && "bg-banner-examples-gray",
        variant === "purple" && "bg-banner-examples-purple",
      )}
    >
      <Link
        to={image?.href ?? button?.href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "flex",
          "max-w-[360px]",
          "h-auto",
          "flex-shrink-0",
          "rounded-lg",
          "overflow-hidden",
        )}
      >
        <img src={image?.src} alt={image?.alt ?? title} loading="lazy" />
      </Link>
      <div
        className={clsx(
          "flex",
          "flex-col",
          "gap-6",
          "justify-center 2xl:justify-start",
          "items-center 2xl:items-start",
          "text-center 2xl:text-start",
          "not-prose",
        )}
      >
        {title && (
          <h2 className={clsx("text-xl md:text-2xl", "text-gray-0")}>
            {title}
          </h2>
        )}
        <p className={clsx("text-sm md:text-base", "text-gray-100")}>
          {description}
        </p>
        <LandingRainbowButton
          className={clsx("w-max")}
          buttonClassname={clsx("!px-4", "!py-2")}
          href={button.href}
          onClick={button.onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={clsx(
              "text-gray-900",
              "text-sm md:text-base",
              "font-bold",
            )}
          >
            {button.text}
          </div>
          <ArrowRightIcon
            className={clsx(
              "ml-1 md:ml-2",
              "w-[14px] h-[14px]",
              "md:w-4 md:h-4",
            )}
          />
        </LandingRainbowButton>
      </div>
      <RefineLogoSeal className={clsx("absolute", "bottom-2", "right-2")} />
    </div>
  );
};
