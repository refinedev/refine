import clsx from "clsx";
import React, { FC, PropsWithChildren } from "react";
import { CloseIcon } from "./icons/close";
import { Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { useScroll } from "framer-motion";

type Props = {
    title?: string;
    onClose: () => void;
    open: boolean;
};

export const CommonDrawer: FC<PropsWithChildren<Props>> = (props) => {
    React.useEffect(() => {
        if (props.open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [props.open]);

    return createPortal(<DrawerComponent {...props} />, document.body);
};

const DEFAULT_TOP_OFFSET = 48;

const DrawerComponent: FC<PropsWithChildren<Props>> = ({
    children,
    title,
    open,
    onClose,
}) => {
    const [topOffset, setTopOffset] = React.useState(DEFAULT_TOP_OFFSET);
    const { scrollY } = useScroll();

    // this is required for the <TopAnnouncement /> component.
    React.useEffect(() => {
        const unsubscribeScrollY = scrollY.onChange((latest) => {
            if (latest >= 48) {
                setTopOffset(0);
                return;
            }
            setTopOffset(DEFAULT_TOP_OFFSET - latest);
        });

        return () => unsubscribeScrollY();
    }, []);

    return (
        <div
            style={{
                top: topOffset,
            }}
            className={clsx(
                "fixed",
                "left-0 right-0 bottom-0",
                "z-modal",
                open && "block",
                !open && "hidden",
            )}
        >
            <Transition
                as="div"
                className={clsx(
                    "z-modal",
                    "w-[240px] h-full",
                    "ml-auto",
                    "p-4",
                    "dark:bg-gray-900 bg-gray-0",
                    "border-l dark:border-gray-800",
                    "dark:shadow-[0_0_72px_24px_#14141F]",
                    "shadow-[0_0_72px_24px_rgba(20, 20, 31, 0.50)]",
                )}
                show={open}
                enter="transition-transform duration-300 transition-ease-in-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300 transition-ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div
                    className={clsx(
                        "flex",
                        "items-center",
                        "justify-between",
                        "dark:text-gray-300 text-gray-900",
                    )}
                >
                    <h3 className={clsx("text-base", "font-semibold", "pl-4")}>
                        {title}
                    </h3>
                    <button
                        className={clsx("appearance-none")}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                {children}
            </Transition>
        </div>
    );
};
