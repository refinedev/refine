import clsx from "clsx";
import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
export const AiLandingCard = ({
  imageUrl,
  title,
  description,
}: {
  imageUrl: {
    dark: string;
    light: string;
  };
  title: string;
  description: string;
}) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <>
      <div
        className={clsx(
          "not-prose",
          "flex-shrink-0",
          "h-full",
          "w-full",
          "p-2 landing-sm:p-4",
          "rounded-2xl landing-sm:rounded-3xl",
          "dark:bg-landing-noise",
          "dark:bg-gray-800 bg-gray-50",
        )}
      >
        <div
          className={clsx(
            "bg-gray-0",
            "dark:bg-gray-900",
            "rounded-lg",
            "overflow-hidden",
          )}
        >
          <img
            src={isDarkTheme ? imageUrl.dark : imageUrl.light}
            className={clsx(
              "bg-no-repeat",
              "bg-right",
              "rounded-lg",
              "h-auto",
              "w-full",
              "max-w-[624px]",
              "aspect-[352/208]",
            )}
          />
        </div>

        <div
          className={clsx(
            "not-prose",
            "mt-4 landing-sm:mt-6 landing-lg:mt-10",
            "px-4 landing-sm:px-6",
          )}
        >
          <h6
            className={clsx(
              "p-0",
              "font-semibold",
              "text-xl",
              "dark:text-white text-gray-900",
            )}
          >
            {title}
          </h6>
          <div
            className={clsx(
              "not-prose",
              "flex",
              "items-center",
              "justify-between",
              "flex-wrap",
              "gap-4 landing-sm:gap-8",
              "mb-4 landing-sm:mb-6",
            )}
          >
            <p
              className={clsx(
                "p-0",
                "mt-4",
                "text-base",
                "dark:text-gray-400 text-gray-600",
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
