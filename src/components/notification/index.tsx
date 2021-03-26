import React, { useEffect } from "react";
import { useInterval } from "react-use";
import { Button, Progress } from "antd";

import { REMOVE, UPDATE_ALL } from "@contexts/notification";
import { useCancelNotification, useNotification } from "@hooks";
import { INotificationContext } from "@interfaces";

export const NotificationProgress: React.FC<{ duration: number }> = ({
    duration,
}) => {
    const [seconds, setSeconds] = React.useState(duration);

    useInterval(
        () => {
            setSeconds((s) => s - 1);
        },
        seconds === 0 ? null : 1000,
    );

    return (
        <Progress
            type="circle"
            percent={seconds * (100 / duration)}
            format={(seconds) =>
                seconds && `${Math.round(seconds / (100 / duration))}`
            }
            width={50}
            strokeColor="#1890ff"
            style={{ color: "red" }}
        />
    );
};

export const Notification: React.FC<{ notifications: any }> = ({
    notifications,
}) => {
    const notification = useNotification();

    const { notificationDispatch } = useCancelNotification();

    console.log("notifications", notifications);

    const successNotification = (id: number, resource: string) => {
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
            .map((t: any) => {
                if (t.isRunning === "new") {
                    const message = (
                        <span style={{ marginLeft: 20 }}>
                            You have 5 seconds to undo
                        </span>
                    );

                    notification.info({
                        key: `${t.id}-${t.resource}-undo`,
                        icon: (
                            <NotificationProgress
                                duration={t.seconds as number}
                            />
                        ),
                        message,
                        btn: (
                            <Button
                                onClick={() => {
                                    notificationDispatch({
                                        type: REMOVE,
                                        payload: { id: t.id },
                                    });
                                    t.cancelMutation();
                                    notification.close(
                                        `${t.id}-${t.resource}-undo`,
                                    );
                                }}
                            >
                                Undo
                            </Button>
                        ),
                        duration: t.seconds,
                        onClose: () => {
                            notificationDispatch({
                                type: REMOVE,
                                payload: { id: t.id },
                            });
                            successNotification(t.id, t.resource);
                        },
                    });

                    return {
                        ...t,
                        isRunning: "running",
                    };
                }
                return t;
            })
            .filter((notif: any) => notif.isRunning !== "ran");

        notificationDispatch({ type: UPDATE_ALL, payload: newNotifications });
    };

    useEffect(() => {
        cancelNotification();
    }, [notifications.length]);

    return null;
};
