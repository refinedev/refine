import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import {
    BaseKey,
    ILiveContext,
    IRefineContext,
    LiveEvent,
    LiveModeProps,
} from "../../../interfaces";
import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";
import { queryKeys } from "@definitions";

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
    const queryKey = queryKeys(resource);

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
                        queryClient.invalidateQueries(queryKey.resourceAll);
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
