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

        notificationDispatch({
            type: ActionTypes.REMOVE,
            payload: { id: id },
        });

        notification.open({
            key: `${id}-${resource}-undo`,
            icon: <Progress type="circle" percent={100} width={50} />,
            message,
            description,
            duration: 3,
        });
    };

    const cancelNotification = () => {
        notifications.forEach((notificationItem: INotification) => {
            if (notificationItem.isRunning === true) {
                if (notificationItem.seconds === 0) {
                    successNotification(
                        notificationItem.id,
                        notificationItem.resource,
                    );

                    return;
                }
                const message = (
                    <span style={{ marginLeft: 20 }}>
                        You have 5 seconds to undo
                    </span>
                );

                notification.open({
                    key: `${notificationItem.id}-${notificationItem.resource}-undo`,
                    icon: (
                        <NotificationProgress
                            dispatch={notificationDispatch}
                            notificationItem={notificationItem}
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
                    duration: 0,
                    onClose: () => {
                        notificationDispatch({
                            type: ActionTypes.REMOVE,
                            payload: { id: notificationItem.id },
                        });
                    },
                });
            }
        });
    };

    useEffect(() => {
        cancelNotification();
    }, [notifications]);

    return null;
};
