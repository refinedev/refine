import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCacheQueries } from "@hooks";
import {
    ILiveContext,
    ILiveModeContext,
    LiveModeProps,
} from "../../interfaces";
import { LiveContext, LiveModeContext } from "@contexts/live";

export type UseSubscriptionProps = {
    channel: string;
    resource: string;
    enabled?: boolean;
} & LiveModeProps;

export const useSubscription = ({
    resource,
    channel,
    enabled = false,
    liveMode: liveModeFromProp,
    onLiveEvent,
}: UseSubscriptionProps): void => {
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

        if (liveMode && enabled) {
            subscription = liveDataContext?.subscribe({
                channel,
                type: "*",
                callback: (event) => {
                    if (liveMode === "immediate") {
                        getAllQueries(resource).forEach((query) => {
                            queryClient.invalidateQueries(query.queryKey);
                        });
                    } else if (liveMode === "controlled") {
                        onLiveEvent?.(event);
                    }

                    onLiveEventContextCallback?.(event);
                },
            });
        }

        console.log("subscribed", channel);

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);
                console.log("unsubscribed", channel);
            }
        };
    }, [enabled]);
};
