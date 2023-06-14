import { useEffect, useState } from "react";
import { UseResourceReturnType, useRefineContext, useResource } from "..";

export type IUseLoadingOvertimeOnIntervalContext = UseResourceReturnType;

export type UseLoadingOvertimeReturnType = {
    elapsedTime?: number;
};

export type UseLoadingOvertimeProps = {
    /**
     * The loading state. If true, the elapsed time will be calculated.
     */
    isLoading: boolean;

    /**
     * The interval in milliseconds. If the loading time exceeds this time, the `onInterval` callback will be called.
     * If not specified, the `interval` value from the `overtime` option of the `RefineProvider` will be used.
     *
     * @default: 1000 (1 second)
     */
    interval?: number;

    /**
     * The callback function that will be called when the loading time exceeds the specified time.
     * If not specified, the `onInterval` value from the `overtime` option of the `RefineProvider` will be used.
     *
     * @param elapsedInterval The elapsed time in milliseconds.
     * @param context The context of the resource.
     */
    onInterval?: (
        elapsedInterval: number,
        context: IUseLoadingOvertimeOnIntervalContext,
    ) => void;
};

/**
 * if you need to do something when the loading time exceeds the specified time, refine provides the `useLoadingOvertime` hook.
 * It returns the elapsed time in milliseconds.
 *
 * @example
 * const { elapsedTime } = useLoadingOvertime({
 *    isLoading,
 *    interval: 1000,
 *    onInterval(elapsedInterval, context) {
 *        console.log("loading overtime", elapsedInterval, context);
 *    },
 * });
 */
export const useLoadingOvertime = ({
    isLoading,
    interval: intervalProp,
    onInterval: onIntervalProp,
}: UseLoadingOvertimeProps): UseLoadingOvertimeReturnType => {
    const resourceContextData = useResource();
    const [elapsedTime, setElapsedTime] = useState<number | undefined>(
        undefined,
    );
    // get overtime options from refine context
    const { options } = useRefineContext();
    const { overtime } = options;

    // pick props or refine context options
    const interval = intervalProp ?? overtime?.interval;
    const onInterval = onIntervalProp ?? overtime?.onInterval;

    useEffect(() => {
        let intervalFn: ReturnType<typeof setInterval>;

        if (isLoading && interval) {
            intervalFn = setInterval(() => {
                // increase elapsed time
                setElapsedTime((prevElapsedTime) => {
                    if (prevElapsedTime === undefined) {
                        return interval;
                    }

                    return prevElapsedTime + interval;
                });
            }, interval);
        }

        return () => {
            clearInterval(intervalFn);
            // reset elapsed time
            setElapsedTime(undefined);
        };
    }, [isLoading, interval]);

    useEffect(() => {
        // call onInterval callback
        if (onInterval && elapsedTime) {
            onInterval(elapsedTime, resourceContextData);
        }
    }, [elapsedTime]);

    return {
        elapsedTime,
    };
};
