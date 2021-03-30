import React, { useEffect, useState } from "react";
import { Progress } from "antd";

import { ActionTypes } from "@contexts/notification";
import { INotification } from "../../interfaces";

export const NotificationProgress: React.FC<{
    notificationItem: INotification;
    dispatch: any;
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
                    },
                });
            }, 1000);
        } else {
            clearTimeout(countDownTimer);
        }
    }, [seconds]);

    return (
        <Progress
            type="circle"
            percent={seconds * (100 / duration)}
            format={(seconds) =>
                seconds && `${Math.round(seconds / (100 / duration))}`
            }
            width={50}
            strokeColor="#1890ff"
        />
    );
};
