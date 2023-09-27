import Link from "@docusaurus/Link";
import { ArrowRightIcon } from "@site/src/refine-theme/icons/arrow-right";
import { LandingRainbowButton } from "@site/src/refine-theme/landing-rainbow-button";
import clsx from "clsx";
import React from "react";

const text = "Struggling with internal tools?";
const description =
    "Explore Refine’s limitless possibilities in crafting CRUD apps, CRM solutions, HR dashboards, and more!";
const image =
    "https://cdn.discordapp.com/attachments/1085908808385187840/1156556183965020201/image.png?ex=65156662&is=651414e2&hm=99b52f918e15c3c89ecd6f986b5af259ef0cfc23a3f877578a1c77e8638a9a87&";

export const BannerSidebar = () => {
    return (
        <div
            className={clsx(
                "flex",
                "flex-col",
                "gap-6",
                "py-6",
                "px-4",
                "rounded-2xl",
                "bg-banner-examples-sider-purple",
                "not-prose",
            )}
        >
            <Link
                to={"https://refine.dev/?playground=true"}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                    "flex",
                    "w-full h-auto xl:h-[152px]",
                    "flex-shrink-0",
                    "rounded-md",
                    "overflow-hidden",
                )}
            >
                <img src={image} alt={"refine App screenshot"} loading="lazy" />
            </Link>

            <h2 className={clsx("text-2xl font-semibold", "text-gray-0")}>
                {text}
            </h2>
            <p className={clsx("text-base", "text-gray-100")}>{description}</p>

            <LandingRainbowButton
                className={clsx("w-max")}
                buttonClassname={clsx("!px-4", "!py-2")}
                href={"https://refine.dev/?playground=true"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div
                    className={clsx("text-gray-900", "text-base", "font-bold")}
                >
                    Try online
                </div>
                <ArrowRightIcon className={clsx("ml-2", "w-4", "h-4")} />
            </LandingRainbowButton>
        </div>
    );
};
