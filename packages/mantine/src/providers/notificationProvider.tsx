import React from "react";
import { NotificationProvider } from "@refinedev/core";
import {
    showNotification,
    updateNotification,
    hideNotification,
} from "@mantine/notifications";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconCheck, IconRotate2, IconX } from "@tabler/icons";

import { RingCountdown } from "@components";

export const notificationProvider = (): NotificationProvider => {
    const activeNotifications: string[] = [];

    const isNotificationActive = (key?: string) => {
        return activeNotifications.includes(key as string);
    };

    const addNotification = (key?: string) => {
        if (key) {
            const index = activeNotifications.indexOf(key);
            if (index === -1) {
                activeNotifications.push(key);
            }
        }
    };

    const removeNotification = (key?: string) => {
        if (key) {
            const index = activeNotifications.indexOf(key);
            if (index > -1) {
                activeNotifications.splice(index, 1);
            }
        }
    };

    const notificationProvider: NotificationProvider = {
        open: ({ message, type, undoableTimeout, key, cancelMutation }) => {
            if (type === "progress") {
                if (isNotificationActive(key)) {
                    updateNotification({
                        id: key!,
                        message: (
                            <Group position="apart" noWrap>
                                <Group spacing="xs" position="center">
                                    <RingCountdown
                                        undoableTimeout={undoableTimeout ?? 0}
                                    />
                                    <Text>{message}</Text>
                                </Group>
                                <ActionIcon
                                    variant="default"
                                    onClick={() => {
                                        cancelMutation?.();
                                        if (key) {
                                            removeNotification(key);
                                            hideNotification(key);
                                        }
                                    }}
                                >
                                    <IconRotate2 size={18} />
                                </ActionIcon>
                            </Group>
                        ),
                        styles: {
                            root: {
                                paddingLeft: "8px",
                                paddingTop: "0px",
                                paddingBottom: "0px",
                                "&::before": { display: "none" },
                            },
                        },
                        disallowClose: true,
                        autoClose: false,
                    });
                } else {
                    addNotification(key);
                    showNotification({
                        id: key,
                        message: (
                            <Group position="apart" noWrap>
                                <Group spacing="xs" position="center">
                                    <RingCountdown
                                        undoableTimeout={undoableTimeout ?? 0}
                                    />
                                    <Text>{message}</Text>
                                </Group>
                                <ActionIcon
                                    variant="default"
                                    onClick={() => {
                                        cancelMutation?.();
                                        if (key) {
                                            removeNotification(key);
                                            hideNotification(key);
                                        }
                                    }}
                                >
                                    <IconRotate2 size={18} />
                                </ActionIcon>
                            </Group>
                        ),
                        styles: {
                            root: {
                                paddingLeft: "8px",
                                paddingTop: "0px",
                                paddingBottom: "0px",
                                "&::before": { display: "none" },
                            },
                        },
                        disallowClose: true,
                        autoClose: false,
                    });
                }
            } else {
                if (isNotificationActive(key)) {
                    updateNotification({
                        id: key!,
                        color: type === "success" ? "primary" : "red",
                        icon:
                            type === "success" ? (
                                <IconCheck size={18} />
                            ) : (
                                <IconX size={18} />
                            ),
                        message,
                        autoClose: 5000,
                    });
                } else {
                    addNotification(key);
                    showNotification({
                        color: type === "success" ? "primary" : "red",
                        icon:
                            type === "success" ? (
                                <IconCheck size={18} />
                            ) : (
                                <IconX size={18} />
                            ),
                        message,
                        onClose: () => {
                            removeNotification(key);
                        },
                        autoClose: 5000,
                    });
                }
            }
        },
        close: (key) => {
            removeNotification(key);
            hideNotification(key);
        },
    };

    return notificationProvider;
};
