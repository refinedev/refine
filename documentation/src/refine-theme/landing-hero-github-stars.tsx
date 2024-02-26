import React from "react";
import clsx from "clsx";
import { useCommunityStatsContext } from "../context/CommunityStats";
import { OrangeStarIcon } from "./icons/orange-star";
import { Spinner } from "./spinner";

export const LandingHeroGithubStars = () => {
  const { loading, githubStarCountText } = useCommunityStatsContext();

  return (
    <a
      href="https://github.com/refinedev/refine"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "self-start",
        "relative",
        "rounded-3xl",
        "p-px",
        "hover:no-underline",
        "w-auto",
        "bg-gray-200 dark:bg-gray-700",
      )}
      style={{
        transform: "translateZ(0)",
      }}
    >
      <div
        className={clsx(
          "absolute",
          "inset-0",
          "overflow-hidden",
          "rounded-3xl",
          "",
        )}
        style={{
          transform: "translateZ(0)",
        }}
      >
        <div
          className={clsx(
            "hidden dark:block",
            "absolute",
            "-top-8",
            "-left-8",
            "animate-github-stars-border",
            "w-24",
            "h-24",
            "rounded-full",
            "bg-refine-orange",
            "opacity-40",
            "blur-xl",
          )}
        />
      </div>
      <div
        className={clsx(
          "hidden dark:block",
          "absolute",
          "-left-3",
          "-top-3",
          "z-[0]",
          "w-12",
          "h-12",
          "blur-lg",
          "bg-refine-orange",
          "rounded-full",
          "opacity-[0.15]",
          "dark:animate-github-stars-glow",
        )}
      />
      <div
        className={clsx(
          "relative",
          "z-[1]",
          "rounded-[23px]",
          "py-[7px]",
          "pl-2",
          "pr-4",
          "flex",
          "gap-2",
          "items-center",
          "justify-center",
          "bg-gray-50 dark:bg-gray-900",
          "dark:bg-landing-hero-github-stars-gradient",
        )}
      >
        <OrangeStarIcon className="drop-shadow-none dark:drop-shadow-github-stars-glow" />
        <span
          className={clsx(
            "font-normal",
            "text-xs",
            "text-transparent",
            "bg-clip-text",
            "bg-landing-hero-github-stars-text-light",
            "dark:bg-landing-hero-github-stars-text-dark",
          )}
        >
          <span className={clsx("font-semibold")}>
            {loading ? (
              <Spinner
                className={clsx("w-3.5 h-3.5", "inline")}
                wrapperProps={{
                  className: clsx("h-3.5", "inline-block", "w-[4ch]"),
                }}
              />
            ) : (
              <span>{githubStarCountText}</span>
            )}
          </span>{" "}
          <span>GitHub stars so far</span>
        </span>
      </div>
    </a>
  );
};
