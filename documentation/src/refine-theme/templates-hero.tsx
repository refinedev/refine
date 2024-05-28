import clsx from "clsx";
import React, { type FC } from "react";
import { CommonThemedImage } from "./common-themed-image";

type Props = { className?: string };

export const TemplatesHero: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "flex-col",
        "items-start landing-md:items-center landing-md:justify-center",
        "gap-6 landing-md:gap-12",
        "not-prose",
        "landing-md:mx-auto",
        "w-full",
        "landing-md:h-[264px]",
        "landing-md:overflow-hidden",
        className,
      )}
    >
      <CommonThemedImage
        className={clsx(
          "absolute",
          "hidden landing-md:block",
          "w-[1200px]",
          "max-w-[1200px]",
        )}
        srcDark="https://refine.ams3.cdn.digitaloceanspaces.com/templates/templates-hero-dark.png"
        srcLight="https://refine.ams3.cdn.digitaloceanspaces.com/templates/templates-hero-light.png"
        alt="Refine Templates"
      />
      <h2
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "gap-2",
          "text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
        )}
      >
        <span className={clsx("dark:text-gray-0 text-gray-900")}>Refine </span>
        <span
          className={clsx(
            "font-semibold",
            "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
            "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
          )}
        >
          Templates
        </span>
      </h2>
      <p
        className={clsx(
          "text-base",
          "max-w-[588px]",
          "dark:text-gray-400 text-gray-600",
        )}
      >
        Explore a range of pre-designed Refine templates, perfect for everything
        from admin panels to dashboards and CRMs. Easily integrate these
        templates with your data sources and begin customizing to jumpstart your
        projects.
      </p>
    </div>
  );
};
