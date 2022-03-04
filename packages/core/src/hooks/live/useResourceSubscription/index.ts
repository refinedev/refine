import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCacheQueries } from "@hooks";
import {
    BaseKey,
    ILiveContext,
    IRefineContext,
    LiveEvent,
    LiveModeProps,
} from "../../../interfaces";
import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";

export type UseResourceSubscriptionProps = {
    channel: string;
    params?: {
        ids?: BaseKey[];
        [key: string]: any;
    };
    types: LiveEvent["type"][];
    resource: string;
    enabled?: boolean;
} & LiveModeProps;

export type PublishType = {
    (event: LiveEvent): void;
};

export const useResourceSubscription = ({
    resource,
    params,
    channel,
    types,
    enabled = true,
    liveMode: liveModeFromProp,
    onLiveEvent,
}: UseResourceSubscriptionProps): void => {
    const queryClient = useQueryClient();
    const getAllQueries = useCacheQueries();
    const liveDataContext = useContext<ILiveContext>(LiveContext);
    const {
        liveMode: liveModeFromContext,
        onLiveEvent: onLiveEventContextCallback,
    } = useContext<IRefineContext>(RefineContext);

    const liveMode = liveModeFromProp ?? liveModeFromContext;

    useEffect(() => {
        let subscription: any;

        if (liveMode && liveMode !== "off" && enabled) {
            subscription = liveDataContext?.subscribe({
                channel,
                params,
                types,
                callback: (event) => {
                    if (liveMode === "auto") {
                        getAllQueries(resource).forEach((query) => {
                            queryClient.invalidateQueries(query.queryKey);
                        });
                    }

                    onLiveEvent?.(event);
                    onLiveEventContextCallback?.(event);
                },
            });
        }

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);
            }
        };
    }, [enabled]);
};
