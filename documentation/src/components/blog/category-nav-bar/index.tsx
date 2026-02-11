import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import clsx from "clsx";

type CategoryItem = {
  value: string;
  name: string;
  permalink: string;
  count?: number;
};

type CategoryNavBarProps = {
  categories?: CategoryItem[];
  className?: string;
};

export function CategoryNavBar({ categories, className }: CategoryNavBarProps) {
  return (
    <>
      <CategoryNavBarSelect
        categories={categories}
        className={clsx("max-w-[184px]", "blog-max:hidden", className)}
      />
      <CategoryNavBarDesktop
        categories={categories}
        className={clsx("hidden blog-max:block", className)}
      />
    </>
  );
}

function CategoryNavBarSelect({ categories, className }: CategoryNavBarProps) {
  const { pathname } = useLocation();
  const normalizedPathname = normalizePathname(pathname);
  const isAllPostsActive = isAllPostsPath(normalizedPathname);
  const selectedCategoryPermalink = getActiveCategoryPermalink(
    pathname,
    categories,
  );
  const selectedCategory = (categories ?? []).find(
    (category) => category.permalink === selectedCategoryPermalink,
  );
  const selectedLabel = selectedCategory?.name ?? "All posts";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (dropdownRef.current?.contains(target)) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className={clsx(
        "w-full",
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "rounded-2xl",
        "p-2",
        className,
      )}
    >
      <div
        ref={dropdownRef}
        className={clsx(
          "relative",
          "w-full",
          "rounded-lg",
          "bg-white",
          "dark:bg-zinc-950",
          "p-1",
        )}
      >
        <button
          type="button"
          className={clsx(
            "w-full",
            "flex",
            "items-center",
            "justify-between",
            "gap-2",
            "rounded-[0.25rem]",
            "py-2",
            "px-3",
            "tracking-[-0.006em]",
            "text-xs",
            "font-medium",
            "text-zinc-900",
            "dark:text-white",
          )}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Select blog category"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={clsx("truncate")}>{selectedLabel}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            className={clsx(
              "flex-shrink-0",
              "text-zinc-500",
              "dark:text-zinc-400",
              "transition-transform",
              isOpen && "rotate-180",
            )}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div
            className={clsx(
              "absolute",
              "left-1",
              "right-1",
              "top-[calc(100%+0.25rem)]",
              "z-20",
              "rounded-lg",
              "border",
              "border-zinc-200",
              "dark:border-zinc-800",
              "bg-white",
              "dark:bg-zinc-950",
              "p-1",
              "shadow-lg",
            )}
            role="listbox"
          >
            <Link
              to="/blog"
              className={clsx(
                "block",
                "no-underline hover:no-underline",
                "whitespace-nowrap",
                "rounded-[0.25rem]",
                "py-2",
                "px-3",
                "tracking-[-0.006em]",
                "text-xs",
                "font-medium",
                isAllPostsActive &&
                  "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                !isAllPostsActive && "text-zinc-500 dark:text-zinc-400",
                !isAllPostsActive &&
                  "hover:text-zinc-200 dark:hover:text-zinc-300",
                !isAllPostsActive &&
                  "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                "transition-colors",
                "duration-200",
                "ease-in-out",
              )}
              onClick={() => setIsOpen(false)}
            >
              All posts
            </Link>

            {(categories ?? []).map((category) => {
              const categoryPath = normalizePathname(category.permalink);
              const isActive =
                normalizedPathname === categoryPath ||
                normalizedPathname.startsWith(`${categoryPath}/page/`);

              return (
                <Link
                  key={category.permalink}
                  to={category.permalink}
                  className={clsx(
                    "block",
                    "no-underline hover:no-underline",
                    "whitespace-nowrap",
                    "rounded-[0.25rem]",
                    "py-2",
                    "px-3",
                    "tracking-[-0.006em]",
                    "text-xs",
                    "font-medium",
                    isActive &&
                      "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                    !isActive && "text-zinc-500 dark:text-zinc-400",
                    !isActive && "hover:text-zinc-200 dark:hover:text-zinc-300",
                    !isActive &&
                      "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryNavBarDesktop({ categories, className }: CategoryNavBarProps) {
  const { pathname } = useLocation();
  const normalizedPathname = normalizePathname(pathname);
  const isAllPostsActive = isAllPostsPath(normalizedPathname);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const element = scrollContainerRef.current;

    if (!element) return;

    const isOverflowing = element.scrollWidth > element.clientWidth + 1;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    setHasOverflow(isOverflowing);
    setShowLeftShadow(isOverflowing && element.scrollLeft > 0);
    setShowRightShadow(isOverflowing && element.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const element = scrollContainerRef.current;

    if (!element) return;

    updateScrollIndicators();

    const handleScroll = () => updateScrollIndicators();

    element.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollIndicators);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateScrollIndicators())
        : null;

    if (resizeObserver) {
      resizeObserver.observe(element);

      if (element.firstElementChild instanceof HTMLElement) {
        resizeObserver.observe(element.firstElementChild);
      }
    }

    return () => {
      element.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollIndicators);
      resizeObserver?.disconnect();
    };
  }, [updateScrollIndicators]);

  useEffect(() => {
    updateScrollIndicators();
  }, [categories, pathname, updateScrollIndicators]);

  return (
    <div
      className={clsx(
        "w-full",
        "max-w-[800px]",
        "border",
        "border-zinc-200",
        "dark:border-zinc-800",
        "rounded-2xl",
        "p-2",
        className,
      )}
    >
      <div className={clsx("relative", "w-full")}>
        <div
          ref={scrollContainerRef}
          className={clsx(
            "overflow-x-auto",
            "[&::-webkit-scrollbar]:hidden",
            "w-full",
            "rounded-lg",
            "bg-white",
            "dark:bg-zinc-950",
            "p-1",
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className={clsx("flex", "w-max", "items-center", "gap-1")}>
            <Link
              to="/blog"
              className={clsx(
                "no-underline hover:no-underline",
                "whitespace-nowrap",
                "rounded-[0.25rem]",
                "py-2",
                "px-3",
                "tracking-[-0.006em]",
                "text-xs",
                "font-medium",
                isAllPostsActive &&
                  "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                !isAllPostsActive && "text-zinc-400 hover:text-zinc-200",
              )}
            >
              All posts
            </Link>
            {(categories ?? []).map((category) => {
              const categoryPath = normalizePathname(category.permalink);
              const isActive =
                normalizedPathname === categoryPath ||
                normalizedPathname.startsWith(`${categoryPath}/page/`);

              return (
                <Link
                  key={category.permalink}
                  to={category.permalink}
                  className={clsx(
                    "no-underline hover:no-underline",
                    "whitespace-nowrap",
                    "rounded-[0.25rem]",
                    "py-2",
                    "px-3",
                    "tracking-[-0.006em]",
                    "text-xs",
                    "font-medium",
                    isActive &&
                      "text-zinc-900 bg-zinc-200 dark:bg-zinc-800 dark:text-white",
                    !isActive && "text-zinc-500 dark:text-zinc-400",
                    !isActive && "hover:text-zinc-200 dark:hover:text-zinc-300",
                    !isActive &&
                      "hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
                    "transition-colors",
                    "duration-200",
                    "ease-in-out",
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>

        {hasOverflow && showLeftShadow && (
          <div
            className={clsx(
              "pointer-events-none",
              "absolute",
              "left-0",
              "top-1",
              "bottom-1",
              "w-12",
              "bg-gradient-to-r",
              "from-white",
              "via-white/95",
              "dark:from-zinc-950",
              "dark:via-zinc-950/95",
              "to-transparent",
            )}
          />
        )}

        {hasOverflow && showRightShadow && (
          <div
            className={clsx(
              "pointer-events-none",
              "absolute",
              "right-0",
              "top-1",
              "bottom-1",
              "w-12",
              "bg-gradient-to-l",
              "from-white",
              "via-white/95",
              "dark:from-zinc-950",
              "dark:via-zinc-950/95",
              "to-transparent",
            )}
          />
        )}
      </div>
    </div>
  );
}

const normalizePathname = (pathname = "") => pathname.replace(/\/+$/, "");

const isAllPostsPath = (normalizedPathname: string) =>
  normalizedPathname === "/blog" ||
  normalizedPathname.startsWith("/blog/page/");

const getActiveCategoryPermalink = (
  pathname: string,
  categories?: CategoryItem[],
) => {
  const normalizedPathname = normalizePathname(pathname);

  if (isAllPostsPath(normalizedPathname)) return "/blog";

  const activeCategory = (categories ?? []).find((category) => {
    const categoryPath = normalizePathname(category.permalink);

    return (
      normalizedPathname === categoryPath ||
      normalizedPathname.startsWith(`${categoryPath}/page/`)
    );
  });

  return activeCategory?.permalink ?? "/blog";
};
