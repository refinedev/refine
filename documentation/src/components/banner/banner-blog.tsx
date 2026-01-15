import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

const desktopImage =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-wide-banner.webp";
const mobileImage =
  "https://refine.ams3.cdn.digitaloceanspaces.com/blog-banners/blog-wide-banner-mobile.webp";

const text = "Refine";
const description =
  "The next-gen approach to build enterprise-ready React-based internal tools, admin panels, dashboards & B2B apps with the power of GenAI.";

export const BannerBlog = () => {
  return (
    <Link
      to={"https://refine.dev/?ref=refine-banner"}
      target="_blank"
      rel="noopener"
      className={clsx("flex", "w-full", "rounded-md", "overflow-hidden")}
      title={text}
      aria-label={description}
    >
      <img
        src={desktopImage}
        alt={text}
        title={description}
        loading="lazy"
        className={clsx("hidden", "md:block", "w-full")}
      />
      <img
        src={mobileImage}
        alt={text}
        title={description}
        loading="lazy"
        className={clsx("block", "md:hidden", "w-full")}
      />
    </Link>
  );
};
