import React from "react";

import {
    UseLoadingOvertimeProps,
    useLoadingOvertime,
} from "@hooks/useLoadingOvertime";

type PropsWithLoading = CommonProps & UseLoadingOvertimeProps;

type PropsWithElapsedTime = CommonProps & {
    elapsedTime: number;
};

type CommonProps = {
    children?: React.ReactNode;
    overtimeComponents: {
        [key: number]: React.ReactNode;
    };
};

export type LoadingOvertimeIndicatorProps =
    | PropsWithLoading
    | PropsWithElapsedTime;

export function LoadingOvertimeIndicator(props: PropsWithLoading): JSX.Element;
export function LoadingOvertimeIndicator(
    props: PropsWithElapsedTime,
): JSX.Element;
export function LoadingOvertimeIndicator(
    props: LoadingOvertimeIndicatorProps,
): JSX.Element {
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
}
