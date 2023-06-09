import React from "react";
import clsx from "clsx";
import { useTOC } from "./doc-toc";
import { Disclosure, Transition } from "@headlessui/react";
import { TriangleDownIcon } from "./icons/triangle-down";

export const DocTOCMobile = () => {
    const { hasTOC, activeId, toc } = useTOC();

    if (!hasTOC) {
        return null;
    }

    return (
        <div className="xl:hidden block w-full mb-10">
            <Disclosure>
                {({ open }) => (
                    <div
                        className={clsx(
                            "rounded-[4px]",
                            "border gray-100 dark:border-gray-700",
                            {
                                "gray-50 dark:bg-gray-800": !open,
                                "bg-transparent": open,
                            },
                        )}
                    >
                        <Disclosure.Button
                            className={clsx(
                                "w-full",
                                "flex items-center gap-3",
                                "px-2 py-2",
                            )}
                        >
                            <TriangleDownIcon
                                className={clsx(
                                    "h-5 w-5",
                                    "text-gray-400 dark:text-gray-500",
                                    "transition-transform duration-200 ease-in-out",
                                    {
                                        "transform -rotate-90": !open,
                                    },
                                )}
                            />
                            <span
                                className={clsx("text-sm", {
                                    "text-gray-900 dark:text-gray-0": open,
                                    "text-gray-500 dark:text-gray-400": !open,
                                })}
                            >
                                On this page
                            </span>
                        </Disclosure.Button>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Disclosure.Panel className="px-2 pt-1 pb-2 h-[384px] overflow-auto">
                                <ul>
                                    {toc.map(({ id, value, level }) => {
                                        const isActive = activeId === id;

                                        return (
                                            <a
                                                key={id}
                                                href={`#${id}`}
                                                className={clsx(
                                                    "refine-toc-item",
                                                    level === 2 && "pl-3",
                                                    level === 3 && "pl-7",
                                                    level === 4 && "pl-11",
                                                    "py-2 pr-3",
                                                    "rounded-lg",
                                                    "transition-colors duration-200 ease-in-out",
                                                    "block",
                                                    "text-sm",
                                                    "leading-6",
                                                    "no-underline hover:no-underline",
                                                    "dark:hover:text-white",
                                                    {
                                                        "dark:text-gray-500":
                                                            !isActive,
                                                        "bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50":
                                                            isActive,
                                                    },
                                                )}
                                                dangerouslySetInnerHTML={{
                                                    __html: value,
                                                }}
                                            />
                                        );
                                    })}
                                </ul>
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};
