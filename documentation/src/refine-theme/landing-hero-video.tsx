import React from "react";
import clsx from "clsx";

export const LandingHeroVideo = () => {
    return (
        <div className="relative">
            <div
                className={clsx(
                    "w-full",
                    "h-[150px]",
                    "absolute",
                    "-bottom-[75px]",
                    "bg-landing-linear-spectrum",
                    "bg-center",
                    "bg-no-repeat",
                    "bg-[length:1920px]",
                    "blur-[100px]",
                    "opacity-25",
                )}
            ></div>
            <div
                className={clsx(
                    "z-[1]",
                    "-mt-16",
                    "max-w-[948px]",
                    "max-h-[496px]",
                    "w-full h-full",
                    "mx-auto",
                    "bg-landing-hero-video-bg",
                    "bg-contain bg-no-repeat bg-bottom",
                    "relative",
                )}
            >
                <video
                    src="assets/hero-video.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full mt-auto opacity-[0.99]"
                />
            </div>
        </div>
    );
};
