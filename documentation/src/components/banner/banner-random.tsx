import React from "react";
import { BannerImageWithText } from "./banner-image-with-text";
import { BannerExamples } from "./banner-examples";
import BrowserOnly from "@docusaurus/BrowserOnly";

const data = [
  {
    description:
      "Refine is a React Framework used by over monthly 15K developers for building enterprise internal tools, dashboards, and B2B apps",
    image: {
      src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-tweet.jpg",
      alt: "X tweet about Refine",
      href: "https://s.refine.dev/blog-twitter?ref=banner-twitter",
    },
    button: {
      text: "Learn more",
      href: "https://s.refine.dev/blog-twitter?ref=banner-twitter",
    },
    bannerName: "banner-twitter",
  },
  /*    {
        title: "Save developer hours!",
        description:
            "An open-source, industry-standard codebase designed for building enterprise-grade internal tools, admin panels, and CRUD apps.",
        image: {
            src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-save-hours.png",
            alt: "Illustration about time is gold",
            href: "https://github.com/refinedev/refine?ref=banner-save-hours",
        },
        button: {
            text: "Learn more",
            href: "https://github.com/refinedev/refine?ref=banner-save-hours",
        },
        bannerName: "banner-save-hours",
    },
    {
        description:
            "refine is ranked among the top 3 rapidly growing React frameworks in the ecosystem.",
        image: {
            src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-oss-insight.png",
            alt: "Photo about refine ranking on OSS Insight website",
            href: "https://github.com/refinedev/refine?ref=banner-oss-insight",
        },
        button: {
            text: "Learn more",
            href: "https://github.com/refinedev/refine?ref=banner-oss-insight",
        },
        bannerName: "banner-oss-insight",
    }, */
];

// +1 for BannerExamples
const random = Math.floor(Math.random() * (data.length + 1));

export const BannerRandom = () => {
  // when random is equal to data.length, we will show BannerExamples
  if (random === data.length) {
    return <BrowserOnly>{() => <BannerExamples />}</BrowserOnly>;
  }

  return (
    <BrowserOnly>{() => <BannerImageWithText {...data[random]} />}</BrowserOnly>
  );
};
