import React from "react";

import {
    UseLoadingOvertimeProps,
    useLoadingOvertime,
} from "@hooks/useLoadingOvertime";

type PropsWithLoading = UseLoadingOvertimeProps;

type PropsWithElapsedTime = {
    elapsedTime: number;
};

type CommonProps = {
    overtimeComponents: {
        [key: number]: React.ReactNode;
    };
};

export type LoadingOvertimeIndicatorProps = CommonProps &
    (PropsWithLoading | PropsWithElapsedTime);

export const LoadingOvertimeIndicator: React.FC<
    React.PropsWithChildren<LoadingOvertimeIndicatorProps>
> = (props) => {
    const { children, overtimeComponents } = props;

    const sortedIntervalKeys = React.useMemo(
        () =>
            Object.keys(overtimeComponents).sort(
                (a, b) => Number(b) - Number(a),
            ),
        [overtimeComponents],
    );

    const renderOvertimeComponent = React.useCallback(
        (elapsedTime: number) => {
            const overtimeComponent = sortedIntervalKeys.find(
                (intervalKey) => elapsedTime >= Number(intervalKey),
            );

            if (!overtimeComponent) {
                return null;
            }

            return overtimeComponents[Number(overtimeComponent)];
        },
        [overtimeComponents, sortedIntervalKeys],
    );

    if ("elapsedTime" in props) {
        const { elapsedTime } = props;

        return (
            <>
                {renderOvertimeComponent(elapsedTime)}
                {children}
            </>
        );
    }

    const { isLoading, interval, onInterval } = props;

    const { elapsedTime } = useLoadingOvertime({
        isLoading,
        interval,
        onInterval,
    });

    return (
        <>
            {renderOvertimeComponent(elapsedTime ?? 0)}
            {children}
        </>
    );
};
