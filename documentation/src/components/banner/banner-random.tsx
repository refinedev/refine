import React from "react";
import { BannerImageWithText } from "./banner-image-with-text";
import { BannerExamples } from "./banner-examples";

const data = [
    {
        description:
            "refine is the tool of choice for over 15k active developers each month.",
        image: {
            src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-tweet.jpg",
            alt: "X tweet about Refine",
            href: "https://twitter.com/refine_dev",
        },
        button: {
            text: "Learn more",
            href: "https://github.com/refinedev/refine",
        },
    },
    {
        title: "Save developer hours!",
        description:
            "Open-source industry-standard code-base design for enterprise grade internal tools, admin panels and CRUD apps.",
        image: {
            src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-save-hours.png",
            alt: "Illustration about time is gold",
            href: "https://github.com/refinedev/refine",
        },
        button: {
            text: "Learn more",
            href: "https://github.com/refinedev/refine",
        },
    },
    {
        description:
            "refine is ranked among the top 3 rapidly growing React frameworks in the ecosystem.",
        image: {
            src: "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/banners/banner-oss-insight.png",
            alt: "Photo about refine ranking on OSS Insight website",
            href: "https://github.com/refinedev/refine",
        },
        button: {
            text: "Learn more",
            href: "https://github.com/refinedev/refine",
        },
    },
];

const BannerImageWithTextList = data.map((item, index) => {
    return <BannerImageWithText key={index} {...item} />;
});

const Banners = [
    ...BannerImageWithTextList,
    <BannerExamples key="banner-examples" />,
];

export const BannerRandom = () => {
    const random = Math.floor(Math.random() * Banners.length);
    const banner = Banners[random];

    return <>{banner}</>;
};
