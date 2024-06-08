import clsx from "clsx";
import React, { type SVGProps } from "react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import { Menu, Transition } from "@headlessui/react";
import Link from "@docusaurus/Link";
import useVersionLinks from "../hooks/use-version-links";

const Triangle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 0a1 1 0 0 1 .78.375l3.1 3.874A2 2 0 0 0 15.442 5H19a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3.558a2 2 0 0 0 1.562-.75L9.22.374A1 1 0 0 1 10 0Z"
      clipRule="evenodd"
    />
  </svg>
);

type Props = {
  className?: string;
  wrapperClassName?: string;
};

export const DocVersionDropdown = ({ className, wrapperClassName }: Props) => {
  const docContext = useActiveDocContext();
  const { links } = useVersionLinks();

  return (
    <div className={wrapperClassName}>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={clsx(
                "appearance-none",
                "focus:outline-none",
                "border border-solid border-gray-300 dark:border-gray-600 lg:dark:border-gray-700",
                "rounded-[32px]",
                "py-1.5",
                "pl-3",
                "pr-2",
                "bg-gray-0 dark:bg-gray-800",
                "lg:bg-transparent lg:dark:bg-transparent",
                "lg:pl-4 lg:pr-3",
                "lg:py-[9px]",
                "flex",
                "items-center",
                "justify-center",
                "gap-1",
                "lg:gap-2",
                "select-none",
                className,
              )}
            >
              <span
                className={clsx(
                  "text-gray-500 dark:text-gray-100",
                  "text-sm leading-5",
                  "block",
                )}
              >
                {docContext.activeVersion.label}
              </span>
              <TriangleDownIcon className="text-gray-400 w-4 h-4" />
            </Menu.Button>

            <Transition
              show={open}
              className="relative z-10"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Triangle
                className={clsx(
                  "absolute right-[11px] top-1 origin-bottom-right",
                  "text-gray-700 dark:text-white",
                )}
              />
              <Menu.Items
                static
                className={clsx(
                  "absolute right-0 top-2 origin-bottom-right",
                  "flex flex-col gap-2",
                  "w-[112px]",
                  "p-2",
                  "bg-gray-700 dark:bg-white",
                  "rounded-lg",
                )}
              >
                {links.map((version) => {
                  return (
                    <Menu.Item key={version.label}>
                      {() => {
                        const isActive =
                          version.label === docContext.activeVersion.label;
                        return (
                          <Link
                            to={version.to}
                            className={clsx(
                              "px-2 py-1",
                              "rounded-[4px]",
                              "no-underline",
                              {
                                "text-white hover:text-white": isActive,
                                "bg-refine-blue": isActive,
                                "text-gray-300 dark:text-gray-700": !isActive,
                                "hover:bg-gray-600 hover:dark:bg-gray-100 hover:text-gray-300 dark:hover:text-gray-700":
                                  !isActive,
                              },
                            )}
                          >
                            {version.label}
                          </Link>
                        );
                      }}
                    </Menu.Item>
                  );
                })}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
