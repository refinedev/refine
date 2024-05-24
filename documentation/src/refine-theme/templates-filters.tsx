import clsx from "clsx";
import React, { type FC, type SVGProps } from "react";

type Props = {
  svgId?: string;
  className?: string;
  selected: {
    uiFramework: string[];
    backend: string[];
  };
  data: {
    uiFrameworks: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
    backends: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
  };
  onBackendChange: (backend: string) => void;
  onUIFrameworkChange: (framework: string) => void;
};

export const TemplatesFilters: FC<Props> = ({
  svgId,
  className,
  data,
  selected,
  onBackendChange,
  onUIFrameworkChange,
}) => {
  return (
    <div className={clsx("flex", "flex-col", "not-prose", className)}>
      <h4
        className={clsx("pl-4", "text-sm", "dark:text-gray-500 text-gray-700")}
      >
        UI Frameworks
      </h4>
      <div className={clsx("flex", "flex-col", "items-start", "gap-3", "mt-4")}>
        {data.uiFrameworks.map((item) => {
          const isSelected = selected.uiFramework.includes(item.label);
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              onClick={() => onUIFrameworkChange(item.label)}
              role="button"
              className={clsx(
                "flex",
                "items-center",
                "py-2 pl-2 pr-4",
                "gap-2",
                "rounded-full",
                "cursor-pointer",
                "border dark:border-gray-700 border-gray-200",
                isSelected && "dark:bg-gray-700 bg-gray-50",
                "transition-colors duration-200 ease-in-out",
              )}
            >
              <Icon id={svgId} />
              <span
                className={clsx(
                  "text-sm",
                  !isSelected && "dark:text-gray-400 text-gray-600",
                  isSelected && "dark:text-gray-0 text-gray-900",
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <h4
        className={clsx(
          "pl-4",
          "text-sm",
          "dark:text-gray-500 text-gray-700",
          "mt-10",
        )}
      >
        Backends
      </h4>
      <div className={clsx("flex", "flex-col", "items-start", "gap-4", "mt-3")}>
        {data.backends.map((item) => {
          const isSelected = selected.backend.includes(item.label);
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              onClick={() => onBackendChange(item.label)}
              role="button"
              className={clsx(
                "flex",
                "items-center",
                "py-2 pl-2 pr-4",
                "gap-2",
                "rounded-full",
                "cursor-pointer",
                "border dark:border-gray-700 border-gray-200",
                isSelected && "dark:bg-gray-700 bg-gray-50",
              )}
            >
              <Icon id={svgId} />
              <span
                className={clsx(
                  "text-sm",
                  !isSelected && "dark:text-gray-400 text-gray-600",
                  isSelected && "dark:text-gray-0 text-gray-900",
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
