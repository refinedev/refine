import React, { Fragment } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import {
    GithubStarIcon,
    GithubIcon,
    DiscordIcon,
    TwitterIcon,
} from "../icons/popover";
import { RefineDarkLogoIcon } from "../icons/refine-dark-logo";
import { CloseIcon } from "../icons/close";
import { MENU_ITEMS, NavbarItemType } from "./constants";
import { MenuItem } from "./menu-item";
import { MobileNavItem } from "./mobile-nav-item";

type MobileMenuModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsModalOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className={clsx("fixed inset-0", "bg-gray-100")}>
                        <div
                            className={clsx(
                                "flex items-center justify-between",
                                "p-4",
                            )}
                        >
                            <RefineDarkLogoIcon />
                            <button
                                type="button"
                                className={clsx(
                                    "rounded-lg",
                                    "hover:bg-gray-200",
                                    "active:scale-90",
                                    "transition-all duration-200 ease-in-out",
                                )}
                            >
                                <CloseIcon
                                    onClick={() => setIsModalOpen(false)}
                                />
                            </button>
                        </div>
                    </div>
                </Transition.Child>

                <div
                    className={clsx(
                        "fixed top-16 left-0 right-0",
                        "overflow-y-auto",
                    )}
                >
                    <div
                        className={clsx(
                            "flex items-start justify-center",
                            "min-h-full h-[calc(100vh-80px)]",
                            "p-4",
                            "text-center",
                            "overflow-auto",
                        )}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className={clsx(
                                    "w-full max-w-[336px] header-sm:max-w-[624px] max-h-full",
                                    "overflow-auto",
                                    "border border-gray-200 rounded-lg",
                                    "bg-white",
                                    "text-left",
                                    "align-middle",
                                    "flex flex-col header-sm:flex-row",
                                )}
                            >
                                <div className="flex-grow">
                                    {MENU_ITEMS.map((item) => {
                                        if (item.isPopover) {
                                            return (
                                                <Disclosure
                                                    key={`modal-${item.label}`}
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <MobileNavItem
                                                                component={
                                                                    Disclosure.Button
                                                                }
                                                                label={
                                                                    item.label
                                                                }
                                                                open={open}
                                                            />

                                                            <Disclosure.Panel>
                                                                {item.items.map(
                                                                    (
                                                                        subItem,
                                                                    ) => (
                                                                        <MenuItem
                                                                            key={
                                                                                subItem.label
                                                                            }
                                                                            item={
                                                                                subItem
                                                                            }
                                                                        />
                                                                    ),
                                                                )}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            );
                                        }

                                        return (
                                            <MobileNavItem
                                                key={`modal-${item.label}`}
                                                label={item.label}
                                                href={
                                                    (item as NavbarItemType)
                                                        .href
                                                }
                                            />
                                        );
                                    })}
                                </div>
                                <div
                                    className={clsx(
                                        "header-sm:w-[288px] max-h-[calc(100vh-97px)]",
                                        "header-sm:bg-gray-50",
                                        "header-sm:flex header-sm:flex-col header-sm:justify-between",
                                        "sticky top-0",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "bg-white header-sm:bg-inherit",
                                            "flex justify-between items-center",
                                            "header-sm:flex-col header-sm:gap-4",
                                            "header-sm:border-b border-gray-200",
                                            "py-3 px-4",
                                        )}
                                    >
                                        <p className="text-gray-500 font-semibold">
                                            Join the party!
                                        </p>
                                        <div className="flex gap-4">
                                            <Link to="https://github.com/refinedev/refine">
                                                <GithubIcon className="h-10 w-10" />
                                            </Link>
                                            <Link to="https://discord.com/invite/refine">
                                                <DiscordIcon className="h-10 w-10" />
                                            </Link>
                                            <Link to="https://twitter.com/refine_dev">
                                                <TwitterIcon className="h-10 w-10" />
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        to="https://github.com/refinedev/refine"
                                        className="no-underline"
                                    >
                                        <div
                                            className={clsx(
                                                "bg-gray-50",
                                                "flex items-center",
                                                "p-4",
                                            )}
                                        >
                                            <GithubStarIcon className="shrink-0" />
                                            <p
                                                className={clsx(
                                                    "ml-4",
                                                    "text-gray-600 text-xs",
                                                )}
                                            >
                                                If you like refine, don’t forget
                                                to star us on GitHub!
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
