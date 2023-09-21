import React, { useState } from "react";
import clsx from "clsx";
import { OptionsIcon } from "src/components/icons/options";
import { PlaygroundIcon } from "src/components/icons/playground";
import { ResourceViewerIcon } from "src/components/icons/resource-viewer";
import { SnippetsIcon } from "src/components/icons/snippets";
import { InferencerPreviewIcon } from "src/components/icons/inferencer-preview";
import { ActiveItemBackground } from "src/components/active-item-background";
import { ComingSoonText } from "src/components/coming-soon-text";

const slides = [
    {
        id: 0,
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/devtools/login/slide1.png",
        icon: <ResourceViewerIcon className={clsx("re-z-[1]")} />,
        title: "Resource Viewer",
    },
    {
        id: 1,
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/devtools/login/slide2.png",
        icon: <OptionsIcon className={clsx("re-z-[1]")} />,
        title: "Refine status",
    },
    {
        id: 2,
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/devtools/login/slide3.png",
        icon: <PlaygroundIcon className={clsx("re-z-[1]")} />,
        title: "Playground",
    },
    {
        id: 3,
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/devtools/login/slide4.png",
        icon: <InferencerPreviewIcon className={clsx("re-z-[1]")} />,
        title: "Inferencer preview",
    },
    {
        id: 4,
        image: "https://refine.ams3.cdn.digitaloceanspaces.com/devtools/login/slide5.png",
        icon: <SnippetsIcon className={clsx("re-z-[1]")} />,
        title: "Snippets",
    },
];

export const FeatureSlide = (props: { className?: string }) => {
    const [slideId, setSlideIndex] = useState(slides[0].id);

    return (
        <div
            className={clsx(
                "re-h-full",
                "re-flex",
                "re-flex-col",
                "re-items-center re-justify-center",
                "re-p-8",
                props.className,
            )}
        >
            <ComingSoonText />
            <div className={clsx("re-mt-14", "min-h-[425px]")}>
                <img src={slides[slideId].image} alt={slides[slideId].title} />
            </div>
            <div
                className={clsx(
                    "re-mt-8",
                    "re-flex",
                    "re-items-center",
                    "re-justify-center",
                    "re-gap-2",
                    "re-p-2",
                    "re-bg-gray-900",
                    "re-rounded-lg",
                )}
            >
                {slides.map((slide) => {
                    const active = slide.id === slideId;

                    return (
                        <div
                            key={slide.id}
                            className={clsx(
                                "re-relative",
                                active
                                    ? "re-text-alt-cyan"
                                    : "re-text-gray-500",
                                !active && "hover:re-text-alt-cyan",
                            )}
                        >
                            <ActiveItemBackground active={active} />
                            <button
                                onClick={() => setSlideIndex(slide.id)}
                                className={clsx(
                                    "re-w-12 re-h-12",
                                    "re-flex",
                                    "re-items-center",
                                    "re-justify-center",
                                )}
                            >
                                {slide.icon}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const FeatureSlideMobile = (props: { className?: string }) => {
    return (
        <div
            className={clsx(
                "re-max-w-[640px]",
                "re-w-full",
                "re-flex",
                "re-flex-col",
                "re-items-center",
                "re-justify-center",
                "re-gap-4",
                "re-p-6",
                "re-bg-gray-800",
                "re-rounded-lg",
                props.className,
            )}
        >
            <ComingSoonText />
            <div
                className={clsx(
                    "re-w-full",
                    "re-h-16",
                    "re-relative",
                    "re-flex",
                    "re-items-center",
                    "re-justify-start",
                    "re-py-6",
                    "re-overflow-hidden",
                    "re-bg-gray-900",
                    "re-rounded-full",
                    "after:re-absolute after:re-z-10 before:re-absolute before:re-z-10",
                    "after:re-rounded-full before:re-rounded-full",
                    "after:re-bg-feature-slide-mobile-after before:re-bg-feature-slide-mobile-before",
                    "after:re-right-0 before:re-left-0",
                    "after:re-h-[120px] before:re-h-[120px]",
                    "after:re-w-[120px] before:re-w-[120px]",
                    "re-border re-border-t-[#3a3b4aa3] re-border-r-[#3a3b4abb] re-border-b-[#3a3b4a] re-border-l-[#3a3b4abb]",
                )}
            >
                <div
                    className={clsx(
                        "re-absolute",
                        "re-left-0",
                        "re-w-auto",
                        "re-flex",
                        "re-items-center",
                        "re-justify-start",
                        "re-gap-5",
                        "re-pr-5",
                        "re-animate-feature-slide-mobile-items",
                    )}
                >
                    {[...slides, ...slides].map((slide, i) => {
                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "re-flex",
                                    "re-items-center",
                                    "re-justify-center",
                                    "re-gap-2",
                                )}
                            >
                                <div className={clsx("re-text-alt-cyan")}>
                                    {slide.icon}
                                </div>
                                <div
                                    className={clsx(
                                        "re-whitespace-nowrap",
                                        "re-bg-gradient-to-r re-from-white re-to-[#FFFFFF80]",
                                        "re-bg-clip-text re-text-transparent",
                                    )}
                                >
                                    {slide.title}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
