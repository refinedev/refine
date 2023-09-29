import { NotificationProvider } from "@refinedev/core";
import { App, notification as staticNotification } from "antd";
import React from "react";

import { UndoableNotification } from "@components/undoableNotification";

export const notificationProvider = () => {
    const { notification: notificationFromContext } = App.useApp();
    const notification =
        "open" in notificationFromContext
            ? notificationFromContext
            : staticNotification;

    const notificationProvider: NotificationProvider = {
        open: ({
            key,
            message,
            description,
            type,
            cancelMutation,
            undoableTimeout,
        }) => {
            if (type === "progress") {
                notification.open({
                    key,
                    description: (
                        <UndoableNotification
                            notificationKey={key}
                            message={message}
                            cancelMutation={cancelMutation}
                            undoableTimeout={undoableTimeout}
                        />
                    ),
                    message: null,
                    duration: 0,
                    closeIcon: <></>,
                });
            } else {
                notification.open({
                    key,
                    description: message,
                    message: description ?? null,
                    type,
                });
            }
        },
        close: (key) => notification.destroy(key),
    };

    return notificationProvider;
};
