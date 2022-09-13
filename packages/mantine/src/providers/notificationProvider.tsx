import React from "react";
import { NotificationProvider } from "@pankod/refine-core";

import { ActionIcon } from "@mantine/core";
import {
    showNotification,
    hideNotification,
    NotificationsProvider,
} from "@mantine/notifications";
import { ArrowBackUp, Check, ExclamationMark } from "tabler-icons-react";
import { RingCountdown } from "@components";

export const notificationProvider = (): NotificationProvider => {
    const notificationProviderHandle: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation }) => {
            if (type === "progress") {
                showNotification({
                    id: key,

                    message: (
                        <div>
                            <p>{message}</p>
                            <ActionIcon
                                onClick={() => {
                                    cancelMutation?.();
                                    if (key) {
                                        hideNotification(key);
                                    }
                                }}
                            >
                                <ArrowBackUp color="dark" />
                            </ActionIcon>
                        </div>
                    ),
                    icon: (
                        <RingCountdown undoableTimeout={undoableTimeout ?? 0} />
                    ),

                    autoClose: undoableTimeout ? undoableTimeout * 1000 : 3000,
                });
            } else {
                showNotification({
                    color: type === "success" ? "green" : "red",
                    icon: type === "success" ? <Check /> : <ExclamationMark />,
                    message,
                    autoClose: 5000,
                });
            }
        },
        close: (key) => {
            hideNotification(key);
        },
    };

    return notificationProviderHandle;
};

export { NotificationsProvider };
