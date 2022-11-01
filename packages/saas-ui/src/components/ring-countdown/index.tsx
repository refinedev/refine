import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

export type RingCountdownProps = {
    undoableTimeout: number;
};

export const RingCountdown: React.FC<RingCountdownProps> = ({
    undoableTimeout,
}) => {
    return (
        <CircularProgress
            size={55}
            thickness={4}
            value={undoableTimeout * 20}
            color="primary"
        >
            <CircularProgressLabel fontWeight="700">
                {undoableTimeout}
            </CircularProgressLabel>
        </CircularProgress>
    );
};
