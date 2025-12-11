import clsx from "clsx";
import React, { type FC } from "react";
import { CommonThemedImage } from "./common-themed-image";

type Props = { className?: string };

export const TemplatesHero: FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "relative",
        "pt-3.5",
        "flex",
        "flex-col",
        "items-start landing-md:items-center landing-md:justify-center",
        "gap-6 landing-md:gap-6",
        "not-prose",
        "landing-md:mx-auto",
        "w-full",
        "landing-md:h-[328px]",
        "landing-md:overflow-hidden",
        "bg-[radial-gradient(50%_100%_at_50%_0%,#431407_0%,rgba(67,20,7,0)_100%)]",
        "before:absolute before:inset-0 before:bg-[url('/assets/hero-cubics.svg')] before:bg-cover before:bg-center  before:mix-blend-overlay before:pointer-events-none",
        className,
      )}
    >
      <h2
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "gap-2",
          "font-semibold tracking-[-0.002rem] text-[32px] leading-[40px] landing-sm:text-[56px] landing-sm:leading-[72px]",
        )}
      >
        <span className={clsx("text-gray-0")}>Refine </span>
        <span
          className={clsx(
            "font-extrabold font-jetBrains-mono",
            "text-orange-400 drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
          )}
        >
          CORE
        </span>
        <span className={clsx("text-gray-0")}>Templates </span>
      </h2>
      <p
        className={clsx(
          "font-normal",
          "tracking-[-0.0053rem]",
          "text-center",
          "max-w-[586px]",
          "text-zinc-300",
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
