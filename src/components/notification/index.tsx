import React, { useEffect } from "react";
import { Button, Progress } from "antd";

import { ActionTypes } from "@contexts/notification";
import { useCancelNotification, useNotification } from "@hooks";
import { INotification } from "@interfaces";

import { NotificationProgress } from "./notificationProgress";

export const Notification: React.FC<{
    notifications: INotification[];
}> = ({ notifications }) => {
    const notification = useNotification();

    const { notificationDispatch } = useCancelNotification();

    const successNotification = (id: string, resource: string) => {
        const message = <span style={{ marginLeft: 20 }}>Successful</span>;

        const description = (
            <span style={{ marginLeft: 20 }}>
                Id: {`${id} ${resource}`} edited
            </span>
        );

        notification.open({
            key: `${id}-${resource}-undo`,
            icon: <Progress type="circle" percent={100} width={50} />,
            message,
            description,
        });
    };

    const cancelNotification = () => {
        const newNotifications = notifications
            .map((notificationItem: INotification) => {
                if (notificationItem.isRunning === "new") {
                    const message = (
                        <span style={{ marginLeft: 20 }}>
                            You have 5 seconds to undo
                        </span>
                    );

                    notification.info({
                        key: `${notificationItem.id}-${notificationItem.resource}-undo`,
                        icon: (
                            <NotificationProgress
                                duration={notificationItem.seconds as number}
                            />
                        ),
                        message,
                        btn: (
                            <Button
                                onClick={() => {
                                    notificationDispatch({
                                        type: ActionTypes.REMOVE,
                                        payload: { id: notificationItem.id },
                                    });
                                    notificationItem.cancelMutation();
                                    notification.close(
                                        `${notificationItem.id}-${notificationItem.resource}-undo`,
                                    );
                                }}
                            >
                                Undo
                            </Button>
                        ),
                        duration: notificationItem.seconds,
                        onClose: () => {
                            notificationDispatch({
                                type: ActionTypes.REMOVE,
                                payload: { id: notificationItem.id },
                            });
                            successNotification(
                                notificationItem.id,
                                notificationItem.resource,
                            );
                        },
                    });

                    return {
                        ...notificationItem,
                        isRunning: "running",
                    };
                }
                return notificationItem;
            })
            .filter((item) => item.isRunning !== "ran");

        notificationDispatch({
            type: ActionTypes.UPDATE_ALL,
            payload: newNotifications,
        });
    };

    useEffect(() => {
        cancelNotification();
    }, [notifications.length]);

    return null;
};
