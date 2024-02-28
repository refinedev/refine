import React from "react";
import clsx from "clsx";
import { LandingHeroMobileAnimation } from "./icons/landing-hero-mobile";

export const LandingHeroVideo = () => {
  return (
    <div className="relative pointer-events-none">
      <div
        className={clsx(
          "w-full",
          "h-[200px]",
          "landing-lg:h-[150px]",
          "absolute",
          "-bottom-[125px]",
          "landing-lg:-bottom-[120px]",
          "bg-landing-linear-spectrum",
          "bg-center",
          "bg-no-repeat",
          "bg-[length:1920px]",
          "blur-[75px]",
          "landing-lg:blur-[125px]",
          "opacity-50",
          "landing-sm:opacity-25",
          "landing-lg:opacity-25",
        )}
        style={{
          transform: "translateZ(0)",
        }}
      />
      <div
        className={clsx(
          "mt-16",
          "landing-md:mt-20",
          "mb-6",
          "landing-sm:mb-10",
          "landing-md:mb-16",
          "block landing-lg:hidden",
          "mx-auto",
          "max-w-[300px]",
          "landing-sm:max-w-[416px]",
          "landing-md:max-w-[592px]",
          "max-h-[348px]",
          "aspect-[592/348]",
          "w-full h-full",
          "z-[1]",
          "relative",
          "animation-parent",
        )}
      >
        <LandingHeroMobileAnimation className="w-full h-auto" />
      </div>
      <div
        className={clsx(
          "hidden landing-lg:block",
          "z-[1]",
          "-mt-16",
          "max-w-[948px]",
          "max-h-[496px]",
          "w-full h-full",
          "mx-auto",
          "bg-landing-hero-video-bg",
          "bg-contain bg-no-repeat bg-center",
          "relative",
          "animation-parent",
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
            src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video.mov"
            type='video/mp4; codecs="hvc1"'
          />
          <source
            src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/hero-video.webm"
            type="video/webm;"
          />
        </video>
      </div>
    </div>
  );
};
