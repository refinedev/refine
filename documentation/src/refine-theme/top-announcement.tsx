import clsx from "clsx";
import React from "react";

export const TopAnnouncement = () => {
  return (
    <div className="not-prose">
      <a
        href="https://refine.dev/ai"
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "w-full",
          "min-h-[48px]",
          "py-2",
          "px-4",
          "md:py-0",
          "relative",
          "appearance-none",
          "border-none",
          "outline-none",
          "cursor-pointer",
          "flex items-center justify-center",
          "no-underline",
          "hover:no-underline",
          "bg-[#FF6154]",
          "flex",
          "items-center",
          "justify-center",
          "gap-4",
        )}
      >
        <img
          src="/assets/product-hunt-logo.png"
          alt="ProductHunt"
          className="h-10 w-10 rounded-full block"
        />
        <div className="text-white font-semibold">
          We’re live on ProductHunt! Go and get your free promo code.
        </div>
      </a>
    </div>
  );
};
