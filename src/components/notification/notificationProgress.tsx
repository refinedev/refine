import React, { useState } from "react";
import { useInterval } from "react-use";

import { Progress } from "antd";

export const NotificationProgress: React.FC<{ duration: number }> = ({
    duration,
}) => {
    const [seconds, setSeconds] = useState(duration);

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
