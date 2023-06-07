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
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    controls={false}
                    className="w-full h-full mt-auto opacity-[0.99]"
                >
                    <source
                        src="assets/hero-video.mov"
                        type='video/mp4; codecs="hvc1"'
                    />
                </video>
            </div>
        </div>
    );
};
