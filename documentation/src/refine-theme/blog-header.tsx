import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import React from "react";

import { DarkModeIcon } from "./icons/dark-mode";
import { BlogSearch } from "./blog-search";
import { LightModeIcon } from "./icons/light-mode";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

const BlogThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <button
      type="button"
      onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
      className={clsx(
        "box-border",
        "flex",
        "h-10",
        "w-10",
        "flex-row",
        "items-center",
        "justify-center",
        "gap-0.5",
        "rounded-lg",
        "border",
        "p-2.5",
        "border-zinc-200",
        "bg-transparent",
        "dark:border-zinc-700",
        "text-zinc-400",
        "transition-colors",
      )}
      aria-label="Toggle color mode"
    >
      {isDarkMode ? (
        <LightModeIcon className={clsx("h-5 w-5 shrink-0")} />
      ) : (
        <DarkModeIcon className={clsx("h-5 w-5 shrink-0")} />
      )}
    </button>
  );
};

export const BlogHeader = React.memo(function BlogHeaderComponent() {
  return (
    <header
      className={clsx(
        "sticky top-0 z-20",
        "h-16",
        "border-b border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-900",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full w-full items-center justify-between",
          "px-4 blog-sm:px-0",
          "w-full",
          "blog-sm:max-w-[328px]",
          "blog-md:max-w-[672px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
        )}
      >
        <div className={clsx("flex items-center gap-2")}>
          <Link
            to="/core"
            className={clsx(
              "flex items-center gap-2",
              "no-underline hover:no-underline",
            )}
          >
            <RefineLogoSingleIcon
              className={clsx("h-6 w-6 text-zinc-900 dark:text-white")}
            />
            <span
              className={clsx(
                "text-base font-semibold leading-6 tracking-[-0.004em]",
                "text-zinc-900 dark:text-white",
              )}
            >
              Refine
            </span>
          </Link>
          <span
            className={clsx(
              "text-base font-normal leading-6 tracking-[-0.004em]",
              "text-zinc-300 dark:text-zinc-600",
            )}
          >
            /
          </span>
          <Link
            to="/blog"
            className={clsx(
              "text-base font-normal leading-6 tracking-[-0.004em]",
              "text-zinc-700 dark:text-zinc-300",
              "no-underline hover:no-underline",
            )}
          >
            Blog
          </Link>
        </div>

        <div className={clsx("flex items-center gap-4")}>
          <BlogSearch />
          <BlogThemeToggle />
        </div>
      </div>
    </header>
  );
});
