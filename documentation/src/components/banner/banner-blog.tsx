import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const desktopImage =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-wide-banner.webp";
const mobileImage =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-wide-banner-mobile.webp";

const bannerName = "banner-refine-ai";
const description =
  "The next-gen approach to build enterprise-ready React-based internal tools, admin panels, dashboards & B2B apps with the power of GenAI.";

export const BannerBlog = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "view_banner", {
        banner_name: bannerName,
        banner_description: description,
        banner_image: desktopImage,
      });
    }
  }, []);

  return (
    <Link
      to={"https://s.refine.dev/banner-with-image?ref=refine-ai-banner"}
      target="_blank"
      rel="noopener"
      className={clsx("flex", "w-full", "rounded-md", "overflow-hidden")}
    >
      <img
        src={desktopImage}
        alt={"refine App screenshot"}
        loading="lazy"
        className={clsx("hidden", "md:block", "w-full")}
      />
      <img
        src={mobileImage}
        alt={"refine App screenshot"}
        loading="lazy"
        className={clsx("block", "md:hidden", "w-full")}
      />
    </Link>
  );
};
