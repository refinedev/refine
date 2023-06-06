import clsx from "clsx";
import React from "react";
import { TriangleDownIcon } from "@site/src/refine-theme/icons/triangle-down";
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client";
import { Menu, Transition } from "@headlessui/react";
import Link from "@docusaurus/Link";
import useVersionLinks from "../hooks/use-version-links";

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
                                    "bg-gray-800",
                                    "hover:bg-gray-700",
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
                                        "text-gray-400",
                                        "text-base",
                                        "block",
                                    )}
                                >
                                    {docContext.activeVersion.label}
                                </span>
                                <TriangleDownIcon className="text-gray-500" />
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
                            <Menu.Items
                                static
                                className={clsx(
                                    "absolute right-0 top-[20px] origin-bottom-right",
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
                                                            {
                                                                "text-white":
                                                                    true,
                                                                "dark:text-gray-900":
                                                                    !isActive,
                                                            },
                                                            {
                                                                "bg-refine-blue":
                                                                    isActive,
                                                                "hover:bg-gray-600":
                                                                    !isActive,
                                                                "dark:hover:bg-gray-100":
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
