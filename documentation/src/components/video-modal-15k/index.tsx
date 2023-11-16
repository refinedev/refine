import { useHistory, useLocation } from "@docusaurus/router";
import { CloseIcon } from "@site/src/refine-theme/icons/close";
import clsx from "clsx";
import React from "react";
import {
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterShareButton,
} from "react-share";
import { Twitter } from "../blog/icons";

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
                !show ? "pointer-events-none" : "",
                !show ? "select-none" : "",
                show ? "scale-100" : "scale-0",
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
            {show && (
                <div
                    className={clsx(
                        "relative",
                        "mx-auto",
                        "top-1/2",
                        "left-0",
                        "-translate-y-1/2",
                        "max-w-2xl",
                        "w-full",
                        "bg-gray-0",
                        "p-2",
                        "md:p-8",
                        "rounded-2xl",
                        "md:rounded-[32px]",
                        "flex",
                        "flex-col",
                        "gap-2",
                        "md:gap-4",
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
                            "md:-right-8",
                            "md:-top-8",
                            "w-8",
                            "h-8",
                            "bg-gray-0",
                            "rounded-full",
                            "p-1",
                            "text-gray-1000",
                            "transition-colors",
                            "duration-200",
                            "ease-in-out",
                            "group",
                            "flex",
                            "items-center",
                            "justify-center",
                        )}
                        onClick={(event) => {
                            event.stopPropagation();
                            onClose();
                        }}
                    >
                        <CloseIcon
                            className={clsx(
                                "w-3 h-3",
                                "group-hover:scale-150",
                                "transition-transform",
                                "duration-200",
                                "ease-in-out",
                            )}
                        />
                    </button>
                    <iframe
                        className={clsx("w-full", "h-full", "aspect-video")}
                        src="https://www.youtube.com/embed/w_3c7_szYuU?si=SJ7gHH4A8ZHHJO1q"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                    <div
                        className={clsx(
                            "flex",
                            "items-center",
                            "gap-4",
                            "ml-auto",
                        )}
                    >
                        <span className="text-gray-900 text-sm">Share on</span>
                        <TwitterShareButton
                            windowWidth={750}
                            windowHeight={800}
                            url={
                                "https://youtu.be/w_3c7_szYuU?si=DSDqz3q1VzyrAHKE"
                            }
                            title={`Take a look at @refine_dev's fun journey to 15K GitHub stars 🌟`}
                            className="flex"
                        >
                            <Twitter
                                className={clsx(
                                    "bg-gray-1000",
                                    "fill-gray-0",
                                    "rounded-full",
                                    "w-8",
                                    "h-8",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "p-2",
                                    "transition-transform",
                                    "duration-200",
                                    "ease-in-out",
                                    "hover:scale-110",
                                )}
                            />
                        </TwitterShareButton>
                        <RedditShareButton
                            className="flex"
                            windowWidth={750}
                            windowHeight={600}
                            url={
                                "https://youtu.be/w_3c7_szYuU?si=DSDqz3q1VzyrAHKE"
                            }
                            title={`Take a look at @refine_dev's fun journey to 15K GitHub stars 🌟`}
                        >
                            <div
                                className={clsx(
                                    "rounded-full",
                                    "h-8",
                                    "w-8",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "bg-[#ff4500]",
                                    "transition-transform",
                                    "duration-200",
                                    "ease-in-out",
                                    "hover:scale-110",
                                )}
                            >
                                <RedditIcon size={28} round />
                            </div>
                        </RedditShareButton>
                        <LinkedinShareButton
                            url={
                                "https://youtu.be/w_3c7_szYuU?si=DSDqz3q1VzyrAHKE"
                            }
                            source={
                                "https://youtu.be/w_3c7_szYuU?si=DSDqz3q1VzyrAHKE"
                            }
                            className="flex"
                            summary={`Take a look at @refine_dev's fun journey to 15K GitHub stars 🌟`}
                            title={`Take a look at @refine_dev's fun journey to 15K GitHub stars 🌟`}
                        >
                            <div
                                className={clsx(
                                    "rounded-full",
                                    "h-8",
                                    "w-8",
                                    "flex",
                                    "items-center",
                                    "justify-center",
                                    "bg-[#007fb1]",
                                    "transition-transform",
                                    "duration-200",
                                    "ease-in-out",
                                    "hover:scale-110",
                                )}
                            >
                                <LinkedinIcon size={32} round />
                            </div>
                        </LinkedinShareButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export const VideoModal15K = () => {
    const { search } = useLocation();
    const [settled, setSettled] = React.useState(false);

    // Mount modal immediately if search includes 15k_modal
    React.useEffect(() => {
        if (search?.includes("15k_modal")) {
            setSettled(true);
        }
    }, [search]);

    return settled ? <Video /> : null;
};
