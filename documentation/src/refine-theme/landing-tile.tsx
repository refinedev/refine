import React from "react";
import clsx from "clsx";

type Props = {
    icon: React.ReactNode;
    children: React.ReactNode;
};

export const LandingTile = ({ icon, children }: Props) => {
    return (
        <div
            className={clsx(
                "rounded-xl",
                "p-px",
                "relative",
                "z-[1]",
                "overflow-hidden",
                "group",
            )}
        >
            <div
                className={clsx(
                    "z-[-1]",
                    "absolute",
                    "w-full",
                    "h-auto",
                    "bg-landing-tile-border-bg",
                    "bg-[length:150%]",
                    "aspect-square",
                    "w-[150%]",
                    "-left-1/4",
                    "-top-1/2",
                    "animate-spin-slow",
                    "animation-paused",
                    "group-hover:animation-running",
                    "group-hover:brightness-125",
                )}
            />
            <div
                className={clsx(
                    "z-[1]",
                    "w-full",
                    "h-full",
                    "bg-refine-bg",
                    "bg-landing-tile-tile-bg",
                    "rounded-xl",
                    "overflow-hidden",
                    "p-2",
                )}
            >
                <div
                    className={clsx(
                        "flex flex-col gap-4",
                        "p-6",
                        "bg-landing-tile-grid-bg",
                        "bg-contain",
                    )}
                >
                    <div
                        className={clsx(
                            "w-full",
                            "flex items-center justify-start",
                        )}
                    >
                        <div
                            className={clsx(
                                "w-16",
                                "h-16",
                                "flex-shrink-0",
                                "border border-refine-landing-tile-icon-border",
                                "rounded-full",
                                "bg-refine-bg",
                                "flex items-center justify-center",
                            )}
                        >
                            {icon}
                        </div>
                    </div>
                    <div className={clsx("text-base", "text-gray-0")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
