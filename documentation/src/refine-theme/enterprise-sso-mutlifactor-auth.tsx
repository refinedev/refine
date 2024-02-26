import React from "react";
import clsx from "clsx";
import { CommonThemedImage } from "./common-themed-image";

export const EnterpriseSSOMultifactorAuth = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col", "not-prose", className)}>
      <div
        className={clsx(
          "grid",
          "grid-cols-1 landing-md:grid-cols-2",
          "gap-8 landing-md:gap-12 landing-lg:gap-6",
        )}
      >
        <div
          className={clsx(
            "flex flex-col",
            "dark:bg-landing-noise",
            "dark:bg-gray-800 bg-gray-50",
            "rounded-2xl landing-sm:rounded-3xl",
          )}
        >
          <CommonThemedImage
            className={clsx("rounded-2xl landing-sm:rounded-3xl")}
            srcDark="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/sign-in-dark.png"
            srcLight="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/sign-in-light.png"
          />
          <div
            className={clsx(
              "flex flex-col",
              "gap-4",
              "p-4 landing-sm:p-10",
              "not-prose",
            )}
          >
            <h2
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Single Sign On
            </h2>
            <p
              className={clsx("text-base", "dark:text-gray-400 text-gray-600")}
            >
              Pre-built components and hooks to easily build your sign-on
              interfaces.
            </p>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-col",
            "dark:bg-landing-noise",
            "dark:bg-gray-800 bg-gray-50",
            "rounded-2xl landing-sm:rounded-3xl",
          )}
        >
          <CommonThemedImage
            className={clsx("rounded-2xl landing-sm:rounded-3xl")}
            srcDark="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/multifactor-dark.png"
            srcLight="https://refine.ams3.cdn.digitaloceanspaces.com/enterprise/multifactor-light.png"
          />
          <div
            className={clsx(
              "flex flex-col",
              "gap-2 landing-sm:gap-4",
              "p-4 landing-sm:p-10",
              "not-prose",
            )}
          >
            <h2
              className={clsx(
                "text-base landing-sm:text-2xl",
                "dark:text-gray-300 text-gray-900",
                "font-semibold",
              )}
            >
              Multifactor Authentication
            </h2>
            <p
              className={clsx("text-base", "dark:text-gray-400 text-gray-600")}
            >
              Customizable components for implementing any type of MFA flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
