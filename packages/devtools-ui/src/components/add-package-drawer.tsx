import React from "react";
import clsx from "clsx";
import { CloseIcon } from "./icons/close";
import { SearchIcon } from "./icons/search";

type Props = {
    visible: boolean;
    onClose: () => void;
    installedPackages: string[];
    dismissOnOverlayClick?: boolean;
};

export const AddPackageDrawer = ({
    visible,
    onClose,
    installedPackages,
    dismissOnOverlayClick = true,
}: Props) => {
    const [delayedVisible, setDelayedVisible] = React.useState(visible);

    React.useEffect(() => {
        setTimeout(() => {
            setDelayedVisible(visible);
        }, 200);
    }, [visible]);

    const onCloseInternal = React.useCallback(() => {
        setDelayedVisible(false);
        setTimeout(() => {
            onClose();
        }, 200);
    }, [onClose]);

    return (
        <div
            className={clsx(
                "re-z-10",
                "re-fixed",
                "re-left-0",
                "re-top-0",
                "re-h-full",
                "re-w-full",
                !visible && "re-hidden",
                visible && "re-block",
                !visible && "re-pointer-events-none",
                visible && "re-pointer-events-auto",
            )}
            onClick={dismissOnOverlayClick ? onCloseInternal : undefined}
        >
            <div
                className={clsx(
                    "re-absolute",
                    "re-w-full",
                    "re-h-full",
                    "re-backdrop-blur-sm",
                    "re-bg-gray-900",
                    "re-bg-opacity-50",
                    "re-transition-all",
                    "re-ease-in-out",
                    "re-duration-200",
                    !delayedVisible && "re-pointer-events-none",
                    delayedVisible && "re-pointer-events-auto",
                )}
                style={{
                    transformOrigin: "center right",
                    transform: `${
                        delayedVisible ? "scale(1)" : "scale(0)"
                    } translate3d(0,0,0)`,
                }}
            />
            <div
                onClick={(e) => e.stopPropagation()}
                className={clsx(
                    "re-absolute",
                    "re-right-0",
                    "re-top-0",
                    "re-h-auto",
                    "re-w-[400px]",
                    "re-overflow-auto",
                    "re-border-l",
                    "re-border-l-gray-700",
                    "re-bg-gray-800",
                    "re-transition-transform",
                    "re-duration-200",
                    "re-ease-in-out",
                    "re-shadow-2xl",
                    delayedVisible && "re-translate-x-0",
                    !delayedVisible && "re-translate-x-full",
                    "re-flex",
                    "re-flex-col",
                    "re-h-full",
                )}
                style={{
                    transformOrigin: "center right",
                    transform: `${
                        delayedVisible ? "translateX(0px)" : "translateX(100%)"
                    } translateZ(0)`,
                }}
            >
                <div
                    className={clsx(
                        "re-p-5",
                        "re-flex",
                        "re-items-center",
                        "re-justify-between",
                        "re-border-b",
                        "re-border-b-gray-700",
                        "re-flex-shrink-0",
                    )}
                >
                    <div
                        className={clsx(
                            "re-text-gray-300",
                            "re-text-sm",
                            "re-leading-6",
                            "re-font-semibold",
                        )}
                    >
                        Explore refine packages
                    </div>
                    <button
                        type="button"
                        onClick={onCloseInternal}
                        className={clsx(
                            "re-w-6",
                            "re-h-6",
                            "re-appearance-none",
                            "re-bg-none",
                            "re-border-none",
                            "re-outline-none",
                            "re-text-gray-500",
                        )}
                    >
                        <CloseIcon className="re-w-6 re-h-6" />
                    </button>
                </div>
                <div
                    className={clsx(
                        "re-flex",
                        "re-flex-col",
                        "re-flex-1",
                        "re-overflow-hidden",
                    )}
                >
                    <div
                        className={clsx(
                            "re-pt-5",
                            "re-px-5",
                            "re-flex",
                            "re-items-center",
                            "re-justify-center",
                            "re-w-full",
                            "re-rounded-lg",
                        )}
                    >
                        <div className={clsx("re-relative", "re-w-full")}>
                            <input
                                type="text"
                                className={clsx(
                                    "re-w-full",
                                    "re-py-[7px]",
                                    "re-pr-2",
                                    "re-rounded-lg",
                                    "re-border",
                                    "re-border-gray-700",
                                    "re-bg-gray-900",
                                    "re-outline-none",
                                    "re-text-gray-300",
                                    "re-placeholder-gray-500",
                                    "re-text-sm",
                                    "re-leading-6",
                                    "re-pl-10",
                                )}
                                placeholder="Search packages"
                            />
                            <div
                                className={clsx(
                                    "re-pointer-events-none",
                                    "re-absolute",
                                    "re-h-full",
                                    "re-top-0",
                                    "re-left-0",
                                    "re-pl-3",
                                    "re-flex",
                                    "re-items-center",
                                    "re-justify-center",
                                )}
                            >
                                <SearchIcon
                                    className={clsx(
                                        "re-text-gray-500",
                                        "re-w-4",
                                        "re-h-4",
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={clsx(
                            "re-overflow-scroll",
                            "re-flex-1",
                            "re-px-5",
                            "re-pb-5",
                            "re-pt-5",
                        )}
                    >
                        <div
                            className={clsx(
                                "re-flex",
                                "re-flex-col",
                                "re-gap-6",
                            )}
                        >
                            {[1, 2, 3, 4, 5].map((el) => (
                                <div
                                    key={el}
                                    className={clsx(
                                        "re-h-[250px]",
                                        "re-border",
                                        "re-border-gray-700",
                                    )}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
