import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { type FC, type SVGProps } from "react";
import type { TemplateEdition } from "../types/integrations";

type Props = {
  className?: string;
  data: {
    title: string;
    description: string;
    image: string;
    to: string;
    edition: TemplateEdition;
    integrations: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
  }[];
};

export const TemplatesList: FC<Props> = ({ className, data }) => {
  return (
    <div className={clsx("not-prose", className)}>
      <div
        className={clsx(
          "grid",
          "grid-cols-1 landing-sm:grid-cols-2 landing-lg:grid-cols-3",
          "gap-8 landing-sm:gap-6",
          "not-prose",
          className,
        )}
      >
        {data.map((item) => {
          return (
            <Link
              to={item.to}
              key={item.title}
              className={clsx(
                "h-full",
                "relative",
                "flex",
                "flex-col",
                "dark:bg-gray-800 bg-gray-50",
                "border dark:border-gray-700 border-transparent",
                "rounded-2xl",
                "hover:no-underline",
                "not-prose",
              )}
            >
              <img
                className={clsx("aspect-[590/405]", "rounded-t-2xl")}
                src={item.image}
              />
              <div
                className={clsx(
                  "h-full",
                  "flex",
                  "flex-col",
                  "p-6",
                  "not-prose",
                )}
              >
                <div
                  className={clsx(
                    "text-base",
                    "font-semibold",
                    "dark:text-gray-300",
                    "text-gray-900",
                  )}
                >
                  {item.title}
                </div>
                <div
                  className={clsx(
                    "text-sm",
                    "dark:text-gray-400",
                    "text-gray-600",
                    "mt-4",
                    "mb-6",
                  )}
                >
                  {item.description}
                </div>
                <div
                  className={clsx(
                    "mt-auto",
                    "flex items-center flex-wrap",
                    "gap-2",
                  )}
                >
                  {item.integrations.map((integration) => {
                    const Icon = integration.icon;

                    return (
                      <div
                        key={integration.label}
                        className={clsx(
                          "flex",
                          "items-center",
                          "gap-2",
                          "py-2 pl-2 pr-4",
                          "rounded-full",
                          "dark:bg-gray-900 bg-gray-0",
                        )}
                      >
                        <Icon id={"template-list"} />
                        <div
                          className={clsx(
                            "text-xs",
                            "dark:text-gray-400",
                            "text-gray-500",
                          )}
                        >
                          {integration.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {item.edition === "Enterprise" && (
                <div className={clsx("absolute", "-top-1", "-right-1")}>
                  <img
                    src="/assets/badge-enterprise.png"
                    alt="enterprise badge"
                    className="w-[120px] h-[120px]"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
