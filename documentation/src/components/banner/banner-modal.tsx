import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { LandingRainbowButton } from "@site/src/refine-theme/landing-rainbow-button";
import { ArrowRightIcon } from "@site/src/refine-theme/icons/arrow-right";
import Link from "@docusaurus/Link";
import { Dialog, Transition } from "@headlessui/react";
import { CloseIcon } from "@site/src/refine-theme/icons/close";
import useScrollTracker from "@site/src/hooks/use-scroll-tracker";

type Props = {
    title?: string;
    variant?: "gray" | "purple";
    image?: {
        src?: string;
        alt?: string;
        href?: string;
    };
    button?: {
        text: string;
        href?: string;
        onClick?: () => void;
    };
};

export const BannerModal: FC<Props> = ({
    image,
    title = "Take a spin and supercharge your development experience.",
    variant = "purple",
    button = {
        text: "Try online",
        href: "https://refine.dev/?playground=true",
        onClick: undefined,
    },
}) => {
    const hasSeen = useRef(false);
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const tracker = useScrollTracker();

    useEffect(() => {
        if (hasSeen.current || isOpen) return;

        if (tracker.scrollY > 79 && tracker.scrollY < 100) {
            setIsOpen(true);
            hasSeen.current = true;
        }
    }, [tracker.scrollY]);

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
                    <div className="fixed inset-0 bg-gray-900/70" />
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
                                    "w-full min-h-screen",
                                    "flex flex-col justify-center items-center",
                                )}
                            >
                                <div
                                    className={clsx(
                                        "relative",
                                        "rounded-3xl",
                                        "max-w-[576px]",
                                        "py-8",
                                        "px-4 md:px-8",
                                        variant === "gray" &&
                                            "bg-banner-examples-modal-gray",
                                        variant === "purple" &&
                                            "bg-banner-examples-modal-purple",
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "flex",
                                            "flex-col",
                                            "items-center",
                                            "gap-8",
                                            "text-center",
                                            "not-prose",
                                        )}
                                    >
                                        <Link
                                            to={image?.href ?? button?.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(
                                                "flex",
                                                "h-auto xl:h-[192px]",
                                                "flex-shrink-0",
                                                "focus:outline-none",
                                            )}
                                        >
                                            <img
                                                src={image?.src}
                                                alt={image?.alt ?? title}
                                                loading="lazy"
                                            />
                                        </Link>
                                        <p
                                            className={clsx(
                                                "text-2xl",
                                                "font-semibold",
                                                variant === "gray" &&
                                                    "bg-clip-text",
                                                variant === "gray" &&
                                                    "text-transparent",
                                                variant === "gray" &&
                                                    "bg-banner-examples-text",
                                                variant === "purple" &&
                                                    "text-gray-0",
                                            )}
                                        >
                                            {title}
                                        </p>
                                        <LandingRainbowButton
                                            className={clsx("w-max")}
                                            buttonClassname={clsx(
                                                "!px-4",
                                                "!py-4",
                                            )}
                                            href={button.href}
                                            onClick={button.onClick}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div
                                                className={clsx(
                                                    "text-gray-900",
                                                    "text-base",
                                                    "font-bold",
                                                )}
                                            >
                                                {button.text}
                                            </div>
                                            <ArrowRightIcon
                                                className={clsx("w-4", "h-4")}
                                            />
                                        </LandingRainbowButton>
                                    </div>
                                    <button
                                        className={clsx(
                                            "absolute",
                                            "top-2 right-2",
                                            "w-8 h-8",
                                            "flex items-center justify-center flex-shrink-0",
                                            "text-gray-0",
                                            "rounded-full",
                                            "bg-gray-900/20",
                                        )}
                                        onClick={onClose}
                                    >
                                        <CloseIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
