import clsx from "clsx";
import React, { SVGProps } from "react";
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
                        <span className="rounded-md shadow-sm">
                            <Menu.Button
                                className={clsx(
                                    "appearance-none",
                                    "border-none",
                                    "focus:outline-none",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "gap-2",
                                    "bg-gray-50 dark:bg-gray-800",
                                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                                    "transition-colors",
                                    "duration-200",
                                    "ease-in-out",
                                    "select-none",
                                    "py-2 pl-2",
                                    "rounded-lg",
                                    className,
                                )}
                            >
                                <span
                                    className={clsx(
                                        "text-gray-500 dark:text-gray-400",
                                        "text-base",
                                        "block",
                                    )}
                                >
                                    {docContext.activeVersion.label}
                                </span>
                                <TriangleDownIcon className="text-gray-400 dark:text-gray-500" />
                            </Menu.Button>
                        </span>

                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Triangle
                                className={clsx(
                                    "absolute right-[2px] top-[-6px] origin-bottom-right",
                                    "text-gray-700 dark:text-white",
                                )}
                            />
                            <Menu.Items
                                static
                                className={clsx(
                                    "absolute right-[-14px] top-[-2px] origin-bottom-right",
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
                                                    version.label ===
                                                    docContext.activeVersion
                                                        .label;
                                                return (
                                                    <Link
                                                        to={version.to}
                                                        className={clsx(
                                                            "px-2 py-1",
                                                            "rounded-[4px]",
                                                            "no-underline",
                                                            {
                                                                "text-white hover:text-white":
                                                                    isActive,
                                                                "bg-refine-blue":
                                                                    isActive,
                                                                "text-gray-300 dark:text-gray-700":
                                                                    !isActive,
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
