import React from "react";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";

export const AiLandingStepFour = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div
      className={clsx(
        "landing-lg:translate-x-8",
        "max-w-[588px]",
        "h-auto",
        "aspect-[588/488]",
        "overflow-hidden",
        "flex-shrink-0",
      )}
    >
      <img
        src={
          isDark
            ? "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-landing-page-fully-customizable-always-yours-dark.png"
            : "https://refine.ams3.cdn.digitaloceanspaces.com/website/static/ai-landing-page/ai-landing-page-fully-customizable-always-yours-light.png"
        }
        alt="Refine AI Download or deploy!"
      />
    </div>
  );
};
