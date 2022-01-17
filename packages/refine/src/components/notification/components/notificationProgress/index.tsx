import React, { useEffect, useState } from "react";
import { Progress } from "antd";

import { ActionTypes } from "@contexts/notification";
import { INotification } from "../../../../interfaces";
import { userFriendlySecond } from "@definitions/helpers";

export const NotificationProgress: React.FC<{
    notificationItem: INotification;
    dispatch: (action: object) => void;
}> = ({ notificationItem, dispatch }) => {
    const [duration] = useState(notificationItem.seconds);
    const seconds = notificationItem.seconds;
    let countDownTimer: ReturnType<typeof setTimeout>;

    useEffect(() => {
        if (seconds > 0) {
            countDownTimer = setTimeout(() => {
                dispatch({
                    type: ActionTypes.DECREASE_NOTIFICATION_SECOND,
                    payload: {
                        id: notificationItem.id,
                        seconds: notificationItem.seconds,
                        resource: notificationItem.resource,
                    },
                });
            }, 1000);
        }

        return () => {
            clearTimeout(countDownTimer);
        };
    }, [seconds]);

    return (
        <Progress
            type="circle"
            percent={seconds * (100 / duration)}
            format={
                (seconds) =>
                    seconds &&
                    `${userFriendlySecond(
                        Math.round(seconds / (100 / duration)),
                    )}` //format milliseconds convert to seconds
            }
            width={50}
            strokeColor="#1890ff"
            status="normal"
        />
    );
};
