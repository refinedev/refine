import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { CommonHomeButton } from "./common-home-button";
import { CommonGithubStarButton } from "./common-github-star-button";
import { RefineLogo } from "./common-refine-logo";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { useSidebarItems } from "./doc-sidebar";
import { DocVersionTabs } from "./doc-version-tabs";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const DocSidebarModal = ({ isOpen, onClose }: Props) => {
    const { items } = useSidebarItems({
        variant: "mobile",
        onLinkClick: onClose,
        deferred: true,
    });

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-modal" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-800" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel
                                className={clsx(
                                    "w-full h-screen",
                                    "flex flex-col",
                                    "py-2 sm:py-3",
                                    "px-2 sm:px-6",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "w-full h-8 sm:h-10",
                                        "px-2 sm:px-0",
                                        "flex items-center justify-between",
                                    )}
                                >
                                    <RefineLogo title="Documentation" />
                                    <div
                                        className={clsx(
                                            "flex items-center gap-4",
                                        )}
                                    >
                                        <CommonHamburgerIcon
                                            onClick={onClose}
                                            active={true}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={clsx(
                                        "relative",
                                        "bg-gray-0 dark:bg-gray-900",
                                        "w-full max-w-[480px] h-full",
                                        "mx-auto mt-4 mb-4 sm:mt-4 sm:mb-8",
                                        "overflow-scroll",
                                        "rounded-lg",
                                        "border border-gray-200 dark:border-gray-600",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "sticky top-0 left-0 right-0",
                                            "z-10",
                                            "h-12",
                                            "bg-gray-50 dark:bg-gray-700",
                                            "border-b border-gray-200 dark:border-gray-600",
                                            "flex items-center gap-5",
                                            "px-4 py-3",
                                        )}
                                    >
                                        <span
                                            className={clsx(
                                                "text-gray-500 dark:text-gray-400",
                                            )}
                                        >
                                            Version
                                        </span>
                                        <DocVersionTabs />
                                    </div>

                                    <div className={clsx("px-4", "relative")}>
                                        {items}
                                    </div>
                                </div>

                                <div
                                    className={clsx(
                                        "flex items-center justify-between",
                                        "mt-2",
                                        "px-2 sm:px-0",
                                        "pb-6 sm:pb-3",
                                    )}
                                >
                                    <CommonHomeButton />
                                    <CommonGithubStarButton />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
