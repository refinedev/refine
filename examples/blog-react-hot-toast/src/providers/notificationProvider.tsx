import React from "react";
import { NotificationProvider } from "@refinedev/core";
import toast from "react-hot-toast";

export const notificationProvider: NotificationProvider = {
    open: ({ key, message, type }) => {
        switch (type) {
            case "success":
                toast.success(message, {
                    id: key,
                    position: "top-right",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "top-left",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "top-center",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "top-right",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "bottom-left",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "bottom-center",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                toast.success("Successfully logged in", {
                    position: "bottom-right",
                    style: {
                        background: "green",
                        color: "#fff",
                    },
                });
                break;
            case "error":
                toast.error(message, {
                    id: key,
                    position: "top-right",
                    style: {
                        background: "red",
                        color: "#fff",
                    },
                });
            default:
                break;
        }
    },
    close: (key: any) => {
        toast.dismiss(key);
    },
};
