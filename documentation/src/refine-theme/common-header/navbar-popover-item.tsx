import React, { Fragment } from "react";
import { useLocation } from "@docusaurus/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon } from "../icons/chevron-down";
import { NavbarPopoverItemType } from "./constants";

type NavbarPopoverItemProps = {
    item: NavbarPopoverItemType;
};

export const NavbarPopoverItem: React.FC<NavbarPopoverItemProps> = ({
    item,
    children,
}) => {
    const [isShowing, setIsShowing] = React.useState(false);
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
                timeoutEnterRef.current = setTimeout(
                    () => setIsShowing(true),
                    210,
                );
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
                            "inline-flex items-center gap-2",
                            "text-base",
                            "font-medium",
                        )}
                    >
                        <span className="text-white">{item.label}</span>
                        <ChevronDownIcon
                            aria-hidden="true"
                            className={clsx(
                                "transition duration-150 ease-in-out",
                                {
                                    "opacity-100": isShowing,
                                },
                            )}
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-in duration-200"
                        enterFrom="opacity-0 translate-y-3"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-out duration-200"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-3"
                        show={isShowing}
                    >
                        <Popover.Panel
                            className={clsx("absolute", "z-50", "top-12", {
                                "-left-32":
                                    item.label === "Community" ||
                                    item.label === "Company",
                            })}
                        >
                            <div
                                className={clsx(
                                    "overflow-hidden",
                                    "rounded-xl",
                                    "border border-gray-200",
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
