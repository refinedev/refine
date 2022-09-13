import React, { useState, useEffect } from "react";
import { RingProgress, Text } from "@mantine/core";

type RingCountdownProps = {
    undoableTimeout: number;
};

export const RingCountdown: React.FC<RingCountdownProps> = ({
    undoableTimeout,
}) => {
    const [progress, setProgress] = useState(100);

    const [timeCount, setTimeCount] = useState(undoableTimeout);

    useEffect(() => {
        const increaseProgress = 100 / undoableTimeout;
        const timer = setInterval(() => {
            setTimeCount((prevProgress) => prevProgress - 1);
            setProgress((prevProgress) => prevProgress - increaseProgress);
        }, 1000);

        if (timeCount === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeCount]);

    return (
        <RingProgress
            sections={[{ value: progress, color: "blue" }]}
            color="blue"
            label={
                <Text color="blue" weight={700} align="center" size="lg">
                    {timeCount}
                </Text>
            }
        />
    );
};
