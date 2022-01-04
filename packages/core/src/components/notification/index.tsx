import React, { useEffect } from "react";
import { Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";

import { ActionTypes } from "@contexts/notification";
import { useCancelNotification, useNotification, useTranslate } from "@hooks";
import { INotification } from "../../interfaces";

import { NotificationProgress } from "./components";
import { userFriendlySecond } from "@definitions/helpers";

export const Notification: React.FC<{
    notifications: INotification[];
}> = ({ notifications }) => {
    const translate = useTranslate();

    const { notificationDispatch } = useCancelNotification();
    const { open, close } = useNotification();

    const cancelNotification = () => {
        notifications.forEach((notificationItem: INotification) => {
            if (notificationItem.isRunning === true) {
                if (notificationItem.seconds === 0) {
                    notificationItem.doMutation();
                }
                const description = (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "-7px",
                        }}
                    >
                        <NotificationProgress
                            dispatch={notificationDispatch}
                            notificationItem={notificationItem}
                        />
                        <span style={{ marginLeft: 8, width: "100%" }}>
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
                        <Button
                            style={{ flexShrink: 0 }}
                            onClick={() => {
                                notificationDispatch({
                                    type: ActionTypes.REMOVE,
                                    payload: {
                                        id: notificationItem.id,
                                        resource: notificationItem.resource,
                                    },
                                });
                                notificationItem.cancelMutation();
                                close(
                                    `${notificationItem.id}-${notificationItem.resource}-notification`,
                                );
                            }}
                            disabled={notificationItem.seconds === 0}
                            icon={<UndoOutlined />}
                        ></Button>
                    </div>
                );

                open({
                    key: `${notificationItem.id}-${notificationItem.resource}-notification`,
                    type: "progress",
                    style: {
                        display: notificationItem.isSilent ? "none" : "block",
                    },
                    message: null,
                    description,
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
