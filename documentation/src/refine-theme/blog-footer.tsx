import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

import { comparisonLinks, socialLinks } from "./footer-data";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

export const BlogFooter = () => {
  return (
    <footer
      data-blog-footer
      className={clsx(
        "w-full",
        "border-t",
        "py-4",
        "border-zinc-200",
        "bg-white",
        "dark:border-zinc-800",
        "dark:bg-zinc-900",
        "blog-md:h-16",
        "blog-md:py-0",
        "not-prose",
      )}
    >
      <div
        className={clsx(
          "mx-auto",
          "not-prose",
          "flex",
          "w-full",
          "flex-col",
          "items-center",
          "justify-center",
          "gap-4",
          "px-4",
          "blog-sm:px-0",
          "blog-sm:max-w-[560px]",
          "blog-md:h-16",
          "blog-md:max-w-[672px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
          "blog-md:flex-row",
          "blog-md:items-center",
          "blog-md:justify-between",
          "blog-md:gap-0",
        )}
      >
        <div
          className={clsx(
            "flex",
            "h-6",
            "flex-row",
            "items-center",
            "justify-center",
            "blog-md:justify-end",
            "gap-4",
            "not-prose",
          )}
        >
          <Link
            to="/"
            className={clsx(
              "flex",
              "h-6",
              "w-6",
              "items-center",
              "justify-center",
              "text-zinc-900",
              "hover:no-underline",
              "dark:text-white",
            )}
          >
            <RefineLogoSingleIcon className={clsx("h-6", "w-6")} />
          </Link>

          <span
            className={clsx(
              "text-2xl",
              "font-thin",
              "leading-6",
              "text-zinc-300",
              "dark:text-zinc-600",
            )}
          >
            /
          </span>

          <Link
            to="/"
            className={clsx(
              "h-6",
              "w-[98px]",
              "text-base",
              "font-semibold",
              "leading-6",
              "tracking-[-0.004em]",
              "text-zinc-900",
              "whitespace-nowrap",
              "hover:no-underline",
              "dark:text-white",
            )}
          >
            Refine{" "}
            <span
              className={clsx(
                "font-normal",
                "text-teal-600",
                "dark:text-teal-400",
              )}
            >
              Home
            </span>
          </Link>

          <span
            className={clsx(
              "text-2xl",
              "font-thin",
              "leading-6",
              "text-zinc-300",
              "dark:text-zinc-600",
            )}
          >
            /
          </span>

          <Link
            to="/core"
            className={clsx(
              "h-6",
              "w-[91px]",
              "text-base",
              "font-semibold",
              "leading-6",
              "tracking-[-0.004em]",
              "text-zinc-900",
              "whitespace-nowrap",
              "hover:no-underline",
              "dark:text-white",
            )}
          >
            Refine{" "}
            <span
              className={clsx(
                "font-bold",
                "font-jetBrains-mono",
                "text-orange-600",
                "dark:text-orange-400",
              )}
            >
              CORE
            </span>
          </Link>

          {/* Desktop-only comparison links, inline with muted style */}
          {comparisonLinks.map(({ href, label }) => (
            <React.Fragment key={href}>
              <span
                className={clsx(
                  "hidden blog-md:inline",
                  "text-2xl",
                  "font-thin",
                  "leading-6",
                  "text-zinc-300",
                  "dark:text-zinc-600",
                )}
              >
                /
              </span>
              <Link
                to={href}
                className={clsx(
                  "hidden blog-md:block",
                  "h-6",
                  "text-sm",
                  "font-normal",
                  "leading-6",
                  "text-zinc-400",
                  "dark:text-zinc-500",
                  "whitespace-nowrap",
                  "hover:no-underline",
                  "hover:text-zinc-600",
                  "dark:hover:text-zinc-300",
                )}
              >
                {label}
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Comparison links — separate muted row on mobile, inline on desktop */}
        <div
          className={clsx(
            "flex",
            "flex-row",
            "items-center",
            "justify-center",
            "gap-6",
            "blog-md:hidden",
          )}
        >
          {comparisonLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={clsx(
                "text-sm",
                "font-normal",
                "leading-5",
                "text-zinc-400",
                "dark:text-zinc-500",
                "hover:no-underline",
                "hover:text-zinc-600",
                "dark:hover:text-zinc-300",
                "whitespace-nowrap",
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div
          className={clsx(
            "hidden",
            "blog-md:flex",
            "h-6",
            "flex-row",
            "items-center",
            "justify-between",
            "gap-4",
          )}
        >
          <span
            className={clsx(
              "h-5",
              "text-right",
              "text-sm",
              "font-semibold",
              "leading-5",
              "tracking-[-0.007em]",
              "text-zinc-900",
              "dark:text-white",
            )}
          >
            Join us on
          </span>

          <div
            className={clsx(
              "flex",
              "h-6",
              "w-[184px]",
              "flex-row",
              "items-start",
              "gap-4",
            )}
          >
            {socialLinks.map(({ href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener"
                className={clsx(
                  "flex",
                  "h-6",
                  "w-6",
                  "flex-col",
                  "items-center",
                  "justify-center",
                  "text-zinc-500",
                  "hover:no-underline",
                  "dark:text-zinc-400",
                )}
              >
                <Icon className={clsx("h-5", "w-5")} />
              </a>
            ))}
          </div>
        </div>

        <div
          className={clsx(
            "flex",
            "h-9",
            "w-auto",
            "flex-row",
            "items-center",
            "justify-center",
            "gap-4",
            "blog-md:hidden",
          )}
        >
          {socialLinks.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              className={clsx(
                "flex",
                "h-9",
                "w-9",
                "flex-col",
                "items-center",
                "justify-center",
                "text-zinc-500",
                "hover:no-underline",
                "dark:text-zinc-400",
              )}
            >
              <Icon className={clsx("h-6", "w-6")} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
