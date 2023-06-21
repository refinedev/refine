import React from "react";

import {
    UseLoadingOvertimeCoreProps,
    useLoadingOvertime,
} from "../../hooks/useLoadingOvertime";

type PropsWithLoading = CommonProps & UseLoadingOvertimeCoreProps;

type PropsWithElapsedTime = CommonProps & {
    /**
     * The elapsed time in milliseconds.
     * If this prop is provided, the component will not use the `useLoadingOvertime` hook.
     */
    elapsedTime: number;
};

type CommonProps = {
    /**
     * Children to render.
     */
    children?: React.ReactNode;
    /**
     * React components to render when the elapsed time is greater than or equal to the key.
     * The key is the number of milliseconds.
     */
    overtimeComponents?: {
        [key: number]: React.ReactNode;
    };
};

export type loadingOvertimeProps = PropsWithLoading | PropsWithElapsedTime;

/**
 * A component that renders children and overtime components based on the elapsed time.
 * The elapsed time is calculated using the `useLoadingOvertime` hook.
 * If the `elapsedTime` prop is provided, the component will not use the `useLoadingOvertime` hook.
 */
export function LoadingOvertime(props: PropsWithLoading): JSX.Element;
export function LoadingOvertime(props: PropsWithElapsedTime): JSX.Element;
export function LoadingOvertime(props: loadingOvertimeProps): JSX.Element {
    const { children, overtimeComponents } = props;

    if (!overtimeComponents) {
        return <>{children}</>;
    }

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
