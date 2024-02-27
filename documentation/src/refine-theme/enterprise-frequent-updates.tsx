import React from "react";
import clsx from "clsx";
import { CommonThemedImage } from "./common-themed-image";

export const EnterpriseFrequentUpdates = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col", "not-prose", className)}>
      <div
        className={clsx(
          "pl-4 landing-sm:pl-6 landing-md:pl-10",
          "text-2xl landing-sm:text-[32px] landing-sm:leading-[40px]",
        )}
      >
        <h2 className={clsx("dark:text-gray-0 text-gray-900")}>
          Get frequent{" "}
          <span
            className={clsx(
              "font-semibold",
              "dark:text-refine-cyan-alt dark:drop-shadow-[0_0_30px_rgba(71,235,235,0.25)]",
              "text-refine-blue drop-shadow-[0_0_30px_rgba(51,51,255,0.3)]",
            )}
          >
            updates
          </span>
          .
        </h2>
      </div>

      <div
        className={clsx(
          "flex flex-col landing-md:flex-row",
          "items-center",
          "gap-12 landing-sm:gap-24 landing-md:gap-16 landing-lg:gap-32",
          "mt-8 landing-md:mt-20",
          "py-10 landing-md:py-16 landing-lg:py-20",
          "px-10",
          "dark:bg-enterprise-frequent-updates-dark bg-enterprise-frequent-updates-light",
          "dark:landing-md:bg-enterprise-frequent-updates-dark-md landing-md:bg-enterprise-frequent-updates-light-md",
          "dark:bg-gray-800 bg-gray-50",
          "rounded-2xl landing-sm:rounded-3xl",
        )}
      >
        <div
          className={clsx(
            "flex",
            "flex-col",
            "gap-8 landing-sm:gap-12  landing-lg:gap-20",
            "landing-lg:max-w-[508px]",
            "landing-md:max-w-[360px]",
          )}
        >
          <div>
            <div
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Continuous updates
            </div>
            <div
              className={clsx(
                "text-base",
                "dark:text-gray-400 text-gray-600",
                "mt-2 landing-sm:mt-4",
              )}
            >
              Continuous updates with the latest features, bug fixes, and
              security patches.
            </div>
          </div>
          <div>
            <div
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Codemod Support
            </div>
            <div
              className={clsx(
                "text-base",
                "dark:text-gray-400 text-gray-600",
                "mt-2 landing-sm:mt-4",
              )}
            >
              Major updates released as Codemod transformations to
              programmatically update your codebase without any manual
              intervention.
            </div>
          </div>
        </div>

        <CommonThemedImage
          className={clsx(
            "block",
            "object-cover",
            "w-[232px] landing-sm:w-[360px]",
            "h-[232px] landing-sm:h-[360px]",
          )}
          srcDark="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/refine-git-history-logo-dark.png"
          srcLight="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/refine-git-history-logo-light.png"
        />
      </div>
    </div>
  );
};
