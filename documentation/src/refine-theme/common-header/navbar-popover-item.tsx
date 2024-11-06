import React, { Fragment, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon } from "../icons/chevron-down";
import type { NavbarPopoverItemType } from "./constants";
import { PointIcon } from "../icons/popover";

type NavbarPopoverItemProps = {
  item: NavbarPopoverItemType;
  variant?: "landing" | "blog";
};

export const NavbarPopoverItem: React.FC<NavbarPopoverItemProps> = ({
  item,
  variant = "landing",
  children,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const timeoutRef = React.useRef(null);
  const timeoutEnterRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    setIsShowing(false);
  }, [location]);

  return (
    <Popover
      id={`popover-${item.label}`}
      key={item.label}
      className={clsx("relative", "inline-flex items-center")}
      onMouseEnter={() => {
        timeoutEnterRef.current = setTimeout(() => setIsShowing(true), 210);
        clearTimeout(timeoutRef.current);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setIsShowing(false), 210);
        clearTimeout(timeoutEnterRef.current);
      }}
    >
      {() => (
        <>
          <Popover.Button
            className={clsx(
              "inline-flex items-center",
              "text-sm leading-6",
              "font-normal",
              "whitespace-nowrap",
            )}
          >
            <span
              className={clsx(
                variant === "landing" && "text-gray-900 dark:text-gray-300",
                variant === "blog" &&
                  "text-refine-react-8 dark:text-refine-react-3",
                "transition-colors duration-150 ease-in-out inline-block",
                // isPermanentDark && "!text-gray-300",
              )}
            >
              {item.label}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className={clsx(
                "transition duration-150 ease-out",
                "-mr-2",
                variant === "landing" && "text-gray-500 dark:text-gray-400",
                variant === "blog" && "text-refine-react-4",
                isShowing ? "translate-y-0.5" : "",
              )}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-150"
            enterFrom="opacity-0 translate-y-3"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-3"
            show={isShowing}
          >
            <Popover.Panel
              className={clsx("absolute", "z-50", "top-12", {
                "-left-32 center-point":
                  item.label === "Community" || item.label === "Company",
                "left-point": item.label === "Open-source",
              })}
            >
              <PointIcon
                id={item.label}
                variant={variant}
                className={clsx("absolute", "top-[-9px]", {
                  "left-1/2": item.label !== "Open-source",
                  "left-12": item.label === "Open-source",
                })}
                style={{ transform: "translateX(-50%)" }}
              />
              <div
                className={clsx(
                  "overflow-hidden",
                  "rounded-xl",
                  variant === "landing" &&
                    "border dark:border-gray-700 border-gray-200",
                  variant === "landing" &&
                    "dark:shadow-menu-dark shadow-menu-light",
                  variant === "blog" &&
                    "border border-refine-react-3 dark:border-refine-react-6",
                  variant === "blog" &&
                    "dark:shadow-menu-blog-dark shadow-menu-blog-light",
                )}
              >
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
