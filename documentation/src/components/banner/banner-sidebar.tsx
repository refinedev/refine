import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

const text = "Explore Refine AI";
const description =
  "The next-gen approach to build enterprise-ready React-based internal tools with the power of GenAI.";
const image =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-side-banner.webp";

export const BannerSidebar = ({ shouldShowBanner }) => {
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.gtag !== "undefined" &&
      shouldShowBanner
    ) {
      window.gtag("event", "view_banner", {
        banner_name: "banner-sidebar",
        banner_text: text,
        banner_description: description,
        banner_image: image,
      });
    }
  }, [shouldShowBanner]);

  return (
    <Link
      to={"https://s.refine.dev/blog-sidebar-ai?ref=banner-sidebar"}
      target="_blank"
      rel="noopener"
      className={clsx("flex", "w-full", "rounded-md", "overflow-hidden")}
    >
      <img src={image} alt={"refine App screenshot"} loading="lazy" />
    </Link>
  );
};
