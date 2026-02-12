import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

import { socialLinks } from "./footer-data";
import { RefineLogoSingleIcon } from "./icons/refine-logo-single";

export const BlogFooter = () => {
  return (
    <footer
      className={clsx(
        "h-16",
        "w-full",
        "border-t",
        "mt-auto",
        "border-zinc-200",
        "bg-zinc-50",
        "dark:border-zinc-800",
        "dark:bg-zinc-900",
      )}
    >
      <div
        className={clsx(
          "mx-auto",
          "flex",
          "h-16",
          "flex-row",
          "items-center",
          "justify-between",
          "px-4 blog-sm:px-0",
          "w-full",
          "blog-sm:max-w-[328px]",
          "blog-md:max-w-[672px]",
          "blog-lg:max-w-[896px]",
          "blog-max:max-w-[1200px]",
        )}
      >
        <div
          className={clsx(
            "flex",
            "h-6",
            "flex-row",
            "items-center",
            "justify-end",
            "gap-4",
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
            aria-hidden="true"
            className={clsx(
              "h-6",
              "w-1",
              "border-l",
              "border-zinc-300",
              "dark:border-zinc-600",
            )}
          />

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
            Refine Home
          </Link>

          <span
            aria-hidden="true"
            className={clsx(
              "h-6",
              "w-1",
              "border-l",
              "border-zinc-300",
              "dark:border-zinc-600",
            )}
          />

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
            Refine CORE
          </Link>
        </div>

        <div
          className={clsx(
            "flex",
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
              "mx-auto",
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
      </div>
    </footer>
  );
};
