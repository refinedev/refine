import React, { useEffect } from "react";
import { Button, notification, Skeleton } from "antd";

import { ActionTypes } from "@contexts/notification";
import { useCancelNotification, useTranslate } from "@hooks";
import { INotification } from "../../interfaces";

import { NotificationProgress } from "./components";
import { userFriendlySecond } from "@definitions/helpers";

export const Notification: React.FC<{
    notifications: INotification[];
}> = ({ notifications }) => {
    const translate = useTranslate();

    const { notificationDispatch } = useCancelNotification();

    const cancelNotification = () => {
        notifications.forEach((notificationItem: INotification) => {
            if (notificationItem.isRunning === true) {
                if (notificationItem.seconds === 0) {
                    notificationItem.doMutation();
                }
                const message = (
                    <span style={{ marginLeft: 20 }}>
                        {translate(
                            "notifications.undoable",
                            {
                                seconds: userFriendlySecond(
                                    notificationItem.seconds,
                                ),
                            },
                            `You have ${userFriendlySecond(
                                notificationItem.seconds,
                            )} seconds to undo`,
                        )}
                    </span>
                );

                notification.open({
                    key: `${notificationItem.id}-${notificationItem.resource}-notification`,
                    style: {
                        display: notificationItem.isSilent ? "none" : "block",
                    },
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
                                    payload: {
                                        id: notificationItem.id,
                                        resource: notificationItem.resource,
                                    },
                                });
                                notificationItem.cancelMutation();
                                notification.close(
                                    `${notificationItem.id}-${notificationItem.resource}-notification`,
                                );
                            }}
                            disabled={notificationItem.seconds === 0}
                        >
                            {translate("buttons.undo", "Undo")}
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
