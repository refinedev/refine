import clsx from "clsx";
import React, { type SVGProps } from "react";

export const TopAnnouncement = () => {
  return (
    <a
      href="https://refine.dev/ai"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "w-full",
        "h-[48px]",
        "relative",
        "appearance-none",
        "border-none",
        "outline-none",
        "cursor-pointer",
        "flex items-center justify-center",
      )}
    >
      <video
        id="refine-ai-banner"
        autoPlay
        loop
        muted
        className="w-full h-[48px] object-cover"
        poster="/assets/refine-ai-banner-bg.png"
      >
        <source
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/refine-ai-banner.mp4"
          type="video/mp4"
        />
      </video>

      <img
        src="/assets/refine-ai-banner-text.png"
        alt="Refine AI"
        className={clsx(
          "absolute",
          "h-[48px]",
          "left-1/2",
          "-translate-x-1/2",
          "top-1/2",
          "-translate-y-1/2",
        )}
      />
    </a>
  );
};
