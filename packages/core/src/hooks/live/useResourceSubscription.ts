import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCacheQueries } from "@hooks";
import {
    ILiveContext,
    ILiveModeContext,
    LiveEvent,
    LiveModeProps,
} from "../../interfaces";
import { LiveContext, LiveModeContext } from "@contexts/live";

export type UseResourceSubscriptionProps = {
    channel: string;
    params?: {
        ids?: string[];
        [key: string]: any;
    };
    type: LiveEvent["type"];
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
    type,
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
    } = useContext<ILiveModeContext>(LiveModeContext);

    const liveMode = liveModeFromProp ?? liveModeFromContext;

    useEffect(() => {
        let subscription: any;

        if (liveMode && liveMode !== "off" && enabled) {
            subscription = liveDataContext?.subscribe({
                channel,
                params,
                type,
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

            console.log("subscribed", channel);
        }

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);

                console.log("unsubscribed", channel);
            }
        };
    }, [enabled]);
};
