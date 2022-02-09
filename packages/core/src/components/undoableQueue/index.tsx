import React, { useEffect } from "react";

import { ActionTypes } from "@contexts/undoableQueue";
import { useCancelNotification, useNotification, useTranslate } from "@hooks";
import { IUndoableQueue } from "../../interfaces";

import { userFriendlySecond } from "@definitions/helpers";

export const UndoableQueue: React.FC<{
    notifications: IUndoableQueue[];
}> = ({ notifications }) => {
    const translate = useTranslate();

    const { notificationDispatch } = useCancelNotification();
    const { open } = useNotification();

    const cancelNotification = () => {
        notifications.forEach((notificationItem: IUndoableQueue) => {
            if (notificationItem.isRunning === true) {
                if (notificationItem.seconds === 0) {
                    notificationItem.doMutation();
                }
                if (!notificationItem.isSilent) {
                    open({
                        key: `${notificationItem.id}-${notificationItem.resource}-notification`,
                        type: "progress",
                        message: translate(
                            "notifications.undoable",
                            {
                                seconds: userFriendlySecond(
                                    notificationItem.seconds,
                                ),
                            },
                            `You have ${userFriendlySecond(
                                notificationItem.seconds,
                            )} seconds to undo`,
                        ),
                        cancelMutation: notificationItem.cancelMutation,
                        undoableTimeout: userFriendlySecond(
                            notificationItem.seconds,
                        ),
                    });
                }

                if (notificationItem.seconds > 0) {
                    setTimeout(() => {
                        notificationDispatch({
                            type: ActionTypes.DECREASE_NOTIFICATION_SECOND,
                            payload: {
                                id: notificationItem.id,
                                seconds: notificationItem.seconds,
                                resource: notificationItem.resource,
                            },
                        });
                    }, 1000);
                }
            }
        });
    };

    useEffect(() => {
        cancelNotification();
    }, [notifications]);

    return null;
};
