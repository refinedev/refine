import clsx from "clsx";
import React, {
  type PropsWithChildren,
  type FC,
  type SVGProps,
  type ReactNode,
} from "react";
import type { TemplateEdition } from "../types/integrations";

export type Filters = {
  edition: TemplateEdition;
  uiFramework: string[];
  backend: string[];
};

type Props = {
  svgId?: string;
  className?: string;
  selected: Filters;
  data: {
    editions: {
      label: string;
      icon: null;
    }[];
    uiFrameworks: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
    backends: {
      label: string;
      icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
  };
  onEditionChange: (edition: string) => void;
  onBackendChange: (backend: Filters["backend"][number]) => void;
  onUIFrameworkChange: (framework: Filters["uiFramework"][number]) => void;
};

export const TemplatesFilters: FC<Props> = ({
  svgId,
  className,
  data,
  selected,
  onEditionChange,
  onBackendChange,
  onUIFrameworkChange,
}) => {
  return (
    <div className={clsx("flex", "flex-col", "not-prose", className)}>
      <List label="Edition">
        {data.editions.map((item) => {
          const isSelected = selected.edition === item.label;

          return (
            <ListItem
              key={item.label}
              label={item.label}
              isSelected={isSelected}
              onClick={() => onEditionChange(item.label)}
            />
          );
        })}
      </List>
      <List label="UI Frameworks" className={clsx("mt-10")}>
        {data.uiFrameworks.map((item) => {
          const isSelected = selected.uiFramework.includes(item.label);
          const Icon = item.icon;

          return (
            <ListItem
              key={item.label}
              icon={<Icon id={svgId} />}
              label={item.label}
              isSelected={isSelected}
              onClick={() => onUIFrameworkChange(item.label)}
            />
          );
        })}
      </List>
      <List label="Backends" className={clsx("mt-10")}>
        {data.backends.map((item) => {
          const isSelected = selected.backend.includes(item.label);
          const Icon = item.icon;

          return (
            <ListItem
              key={item.label}
              icon={<Icon id={svgId} />}
              label={item.label}
              isSelected={isSelected}
              onClick={() => onBackendChange(item.label)}
            />
          );
        })}
      </List>
    </div>
  );
};

const List = (
  props: PropsWithChildren<{
    label: string;
    className?: string;
  }>,
) => {
  return (
    <>
      <h4
        className={clsx(
          "pl-4",
          "text-sm",
          "dark:text-gray-500 text-gray-700",
          props.className,
        )}
      >
        {props.label}
      </h4>
      <div className={clsx("flex", "flex-col", "items-start", "gap-4", "mt-3")}>
        {props.children}
      </div>
    </>
  );
};

const ListItem = (props: {
  icon?: ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={props.onClick}
      className={clsx(
        "appearance-none",
        "flex",
        "items-center",
        "h-10",
        "pr-4",
        props.icon && "pl-2",
        !props.icon && "pl-4",
        "gap-2",
        "rounded-full",
        "cursor-pointer",
        "border dark:border-gray-700 border-gray-200",
        props.isSelected && "dark:bg-gray-700 bg-gray-50",
        "transition-colors duration-200 ease-in-out",
      )}
    >
      {props.icon}
      <span
        className={clsx(
          "text-sm",
          !props.isSelected && "dark:text-gray-400 text-gray-600",
          props.isSelected && "dark:text-gray-0 text-gray-900",
        )}
      >
        {props.label}
      </span>
    </button>
  );
};
