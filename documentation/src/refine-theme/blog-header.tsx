import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import clsx from "clsx";
import React from "react";

import { DarkModeIcon } from "./icons/dark-mode";
import { BlogSearch } from "./blog-search";
import { LightModeIcon } from "./icons/light-mode";
import { MagnifierIcon } from "./icons/magnifier";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

const BlogSearchButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(function BlogSearchButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        "flex h-10 w-[304px] items-center gap-2 rounded-lg border",
        "border-zinc-200 bg-white px-2.5",
        "dark:border-zinc-700 dark:bg-[#18181B]",
        "text-zinc-400",
        "no-underline hover:no-underline",
        "transition-colors",
        className,
      )}
    >
      <MagnifierIcon
        className={clsx("h-5 w-5 text-zinc-500 dark:text-zinc-500")}
      />
      <span
        className={clsx(
          "text-sm font-normal leading-5 tracking-[-0.007em]",
          "text-zinc-400",
        )}
      >
        Search blog
      </span>
    </button>
  );
});

const BlogSearchIconButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(function BlogSearchIconButton({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-lg border",
        "border-zinc-200 bg-white",
        "dark:border-zinc-700 dark:bg-[#18181B]",
        "text-zinc-400",
        "no-underline hover:no-underline",
        "transition-colors",
        className,
      )}
    >
      <MagnifierIcon
        className={clsx("h-5 w-5 text-zinc-500 dark:text-zinc-500")}
      />
    </button>
  );
});

const BlogThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <button
      type="button"
      onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-lg border",
        "border-zinc-200 bg-white",
        "dark:border-zinc-700 dark:bg-[#18181B]",
        "text-zinc-400",
        "transition-colors",
      )}
      aria-label="Toggle color mode"
    >
      {isDarkMode ? (
        <LightModeIcon className={clsx("h-5 w-5")} />
      ) : (
        <DarkModeIcon className={clsx("h-5 w-5")} />
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
        "bg-white dark:bg-[#18181B]",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full w-full items-center justify-between",
          "px-8 blog-max:px-12",
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
          <div className={clsx("hidden blog-md:flex")}>
            <BlogSearch CustomButton={BlogSearchButton} />
          </div>
          <div className={clsx("blog-md:hidden flex")}>
            <BlogSearch CustomButton={BlogSearchIconButton} />
          </div>
          <BlogThemeToggle />
        </div>
      </div>
    </header>
  );
});
