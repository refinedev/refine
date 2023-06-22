import React from "react";

import {
    UseLoadingOvertimeCoreProps,
    useLoadingOvertime,
} from "../../hooks/useLoadingOvertime";

type PropsWithLoading = CommonProps & {
    /**
     * The loading state. If true, the elapsed time will be calculated.
     *
     * @default: false
     */
    isLoading?: UseLoadingOvertimeCoreProps["isLoading"];
    /**
     * The interval in milliseconds. If the loading time exceeds this time, the `onInterval` callback will be called.
     * If not specified, the `interval` value from the `overtime` option of the `RefineProvider` will be used.
     *
     * @default: 1000 (1 second)
     */
    interval?: UseLoadingOvertimeCoreProps["interval"];
    /**
     * The callback function that will be called when the loading time exceeds the specified time.
     * If not specified, the `onInterval` value from the `overtime` option of the `RefineProvider` will be used.
     *
     * @param elapsedInterval The elapsed time in milliseconds.
     */
    onInterval?: UseLoadingOvertimeCoreProps["onInterval"];
    elapsedTime?: never;
};

type PropsWithElapsedTime = CommonProps & {
    /**
     * The elapsed time in milliseconds.
     * If this prop is provided, the component will not use the `useLoadingOvertime` hook.
     *
     * @default: 0
     */
    elapsedTime?: number;
    isLoading?: never;
    interval?: never;
    onInterval?: never;
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
        (elapsedTime = 0) => {
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
        const { elapsedTime = 0 } = props;

        return (
            <>
                {renderOvertimeComponent(elapsedTime)}
                {children}
            </>
        );
    }

    const { isLoading = false, interval, onInterval } = props;

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
