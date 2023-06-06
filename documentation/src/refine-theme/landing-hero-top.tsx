import React from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "./landing-rainbow-button";
import { LandingGhostButton } from "./landing-ghost-button";

export const LandingHeroTop = () => {
    return (
        <div className={clsx("flex flex-col", "justify-center", "gap-8")}>
            <div>
                <h1
                    className={clsx(
                        "flex items-center justify-center",
                        "gap-2",
                        "flex-col",
                        "text-[40px] leading-[48px]",
                    )}
                >
                    <span
                        className={clsx(
                            "block bg-landing-text-bg bg-clip-text text-transparent",
                            "font-semibold",
                        )}
                    >
                        Open-source enterprise application platform
                    </span>
                    <span
                        className={clsx(
                            "block bg-landing-text-bg bg-clip-text text-transparent",
                            "font-light",
                        )}
                    >
                        for serious web developers.
                    </span>
                </h1>
            </div>
            <div className={clsx("flex items-center justify-center", "gap-10")}>
                <LandingRainbowButton />
                <LandingGhostButton />
            </div>
        </div>
    );
};
