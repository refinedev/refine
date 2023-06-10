import React from "react";
import { LandingSlidingHighlights } from "./landing-sliding-highlights";
import clsx from "clsx";

export const LandingHeroBottom = () => {
    return (
        <div className="relative min-h-[288px]">
            <div
                className={clsx(
                    "hidden landing-lg:block",
                    "w-full",
                    "h-[288px]",
                    "-mt-[14px]",
                    "bg-refine-bg",
                    "landing-mask-image-bg",
                )}
            />
            <div
                className={clsx(
                    "block landing-lg:hidden",
                    "w-full",
                    "h-[288px]",
                    "-mt-[14px]",
                    "bg-refine-bg",
                    "landing-image-bottom-mobile-bg",
                    "bg-[length:620px_350px]",
                    "landing-sm:bg-[length:720px_316px]",
                    "landing-md:bg-[length:1080px_474px]",
                    "bg-top",
                )}
            />
            <div
                className={clsx(
                    "hidden landing-lg:block",
                    "absolute",
                    "left-0",
                    "bg-landing-video-bottom-line",
                    "bg-[length:1920px_327px]",
                    "bg-top",
                    "top-[-7px]",
                    "w-full",
                    "h-[288px]",
                    "-mt-[14px]",
                )}
            />
            <div
                className={clsx(
                    "hidden landing-lg:block",
                    "absolute",
                    "left-0",
                    "bg-landing-video-bottom-line-glow",
                    "bg-[length:1920px_327px]",
                    "bg-top",
                    "top-[-7px]",
                    "w-full",
                    "h-[288px]",
                    "-mt-[14px]",
                    "animate-beat",
                )}
            />
            <div
                className={clsx(
                    "z-[1]",
                    "block",
                    "w-full",
                    "-mt-[290px]",
                    "landing-sm:-mt-[304px]",
                    "landing-lg:-mt-[288px]",
                    "relative",
                )}
            >
                <div
                    className={clsx(
                        "flex items-center justify-center",
                        "flex-col",
                        "text-gray-0 text-2xl pt-9",
                    )}
                >
                    <div
                        className={clsx(
                            "text-base",
                            "landing-md:text-2xl",
                            "font-normal",
                            "bg-landing-text-bg bg-clip-text",
                            "text-transparent",
                            "mb-2",
                            "landing-md:mb-0",
                        )}
                    >
                        Your application with enterprise-grade
                    </div>
                    <div className="relative w-[300px]">
                        <LandingSlidingHighlights />
                    </div>
                    <div className="pt-16 landing-md:pt-12">
                        <a
                            href="https://www.producthunt.com/posts/refine-3?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-refine&#0045;3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=362220&theme=dark&period=daily"
                                alt="refine - 100&#0037;&#0032;open&#0032;source&#0032;React&#0032;framework&#0032;to&#0032;build&#0032;web&#0032;apps&#0032;3x&#0032;faster | Product Hunt"
                                style={{ width: "250px", height: "54px" }}
                                width="250"
                                height="54"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
