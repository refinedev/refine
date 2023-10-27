import React from "react";
import clsx from "clsx";
import { CloseIcon } from "@site/src/refine-theme/icons/close";
import { useLocation, useHistory } from "@docusaurus/router";

export const Video = () => {
    const { search } = useLocation();
    const { replace } = useHistory();
    const [forceShow, setForceShow] = React.useState(false);
    const [cookieStatus, setCookieStatus] = React.useState<
        "initial" | "unset" | "shown"
    >("initial");

    // Force show modal if search includes 15k_modal
    React.useEffect(() => {
        if (search?.includes("15k_modal")) {
            setForceShow(true);
        } else {
            setForceShow(false);
        }
    }, [search]);

    // Check if cookie is set
    React.useEffect(() => {
        const cookie = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("15k_video_modal="));

        if (cookie) {
            setCookieStatus("shown");
        } else {
            setCookieStatus("unset");
        }
    }, []);

    // Auto set cookie after 2 seconds
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (cookieStatus === "unset") {
                document.cookie = "15k_video_modal=true";
            }
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [cookieStatus]);

    // Close, set cookie and remove search
    const onClose = () => {
        setCookieStatus("shown");
        document.cookie = "15k_video_modal=true";
        replace({
            search: "",
        });
    };

    // If showing by cookie, add search
    React.useEffect(() => {
        if (cookieStatus === "unset") {
            replace({
                search: "?15k_modal=1",
            });
        }
    }, [cookieStatus]);

    const show = forceShow || cookieStatus === "unset";

    return (
        <div
            className={clsx(
                "transition-all",
                "duration-200",
                "ease-in-out",
                "origin-center",
                show ? "scale-100" : "scale-50",
                show ? "opacity-100" : "opacity-0",
                "z-[9999]",
                "fixed",
                "top-0",
                "left-0",
                "right-0",
                "bottom-0",
                "w-full",
                "h-full",
                "bg-gray-900",
                "bg-opacity-30",
                "backdrop-blur-sm",
                "p-2",
            )}
            onClick={() => {
                onClose();
            }}
        >
            <div
                className={clsx(
                    "relative",
                    "mx-auto",
                    "top-1/2",
                    "left-0",
                    "-translate-y-1/2",
                    "aspect-video",
                    "max-w-2xl",
                    "w-full",
                )}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
            >
                <button
                    type="button"
                    name="close-video"
                    className={clsx(
                        "absolute",
                        "right-0",
                        "-top-12",
                        "bg-gray-500",
                        "rounded-full",
                        "p-1",
                        "hover:bg-gray-600",
                        "text-gray-200",
                        "transition-colors",
                        "duration-200",
                        "ease-in-out",
                        "group",
                    )}
                    onClick={(event) => {
                        event.stopPropagation();
                        onClose();
                    }}
                >
                    <CloseIcon
                        className={clsx(
                            "w-6 h-6",
                            "group-hover:scale-125",
                            "transition-transform",
                            "duration-200",
                            "ease-in-out",
                        )}
                    />
                </button>
                <iframe
                    className={clsx(
                        "w-full",
                        "h-full",
                        "drop-shadow-md",
                        "border-solid",
                        "border",
                        "border-gray-300",
                        "border-opacity-20",
                    )}
                    src="https://www.youtube.com/embed/w_3c7_szYuU?si=SJ7gHH4A8ZHHJO1q"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export const VideoModal15K = () => {
    const { search } = useLocation();
    const [settled, setSettled] = React.useState(false);

    // Mount video modal after 15 seconds
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSettled(true);
        }, 15 * 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // Mount modal immediately if search includes 15k_modal
    React.useEffect(() => {
        if (search?.includes("15k_modal")) {
            setSettled(true);
        }
    }, [search]);

    return settled ? <Video /> : null;
};
