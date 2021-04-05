import React, { useEffect } from "react";
import { Button, Progress } from "antd";

import { ActionTypes } from "@contexts/notification";
import { useCancelNotification, useNotification, useTranslate } from "@hooks";
import { INotification } from "../../interfaces";

import { NotificationProgress } from "./components";

export const Notification: React.FC<{
    notifications: INotification[];
}> = ({ notifications }) => {
    const notification = useNotification();
    const translate = useTranslate();

    const { notificationDispatch } = useCancelNotification();

    const successNotification = (id: string, resource: string) => {
        const message = (
            <span style={{ marginLeft: 20 }}>
                {translate("common:notifications.success", "Successful")}
            </span>
        );

        const description = (
            <span style={{ marginLeft: 20 }}>
                {translate(
                    "common:notifications.succesMessage",
                    {
                        id: id,
                        resource: resource,
                    },
                    `Id: ${id} ${resource} edited`,
                )}
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
                        {translate(
                            "common:notifications.undoable",
                            {
                                seconds: notificationItem.seconds / 1000,
                            },
                            `You have ${
                                notificationItem.seconds / 1000
                            } seconds to undo`,
                        )}
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
                            {translate("common:buttons.undo", "Undo")}
                        </Button>
                    ),
                    duration: 0,
                    closeIcon: <></>,
                });
            }
        });
    };

    useEffect(() => {
        cancelNotification();
    }, [notifications]);

    return null;
};
