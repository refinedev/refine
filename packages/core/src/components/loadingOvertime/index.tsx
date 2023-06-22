import React from "react";

import {
    UseLoadingOvertimeCoreProps,
    useLoadingOvertime,
} from "../../hooks/useLoadingOvertime";

type PropsWithLoading = CommonProps &
    Partial<UseLoadingOvertimeCoreProps> & {
        elapsedTime?: never;
    };

type PropsWithElapsedTime = CommonProps & {
    /**
     * The elapsed time in milliseconds.
     * If this prop is provided, the component will not calculate the elapsed time itself.
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
 * The elapsed time is calculated automatically if the `elapsedTime` prop is not provided.
 * If the `elapsedTime` prop is provided, the component will not calculate the elapsed time itself.
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
