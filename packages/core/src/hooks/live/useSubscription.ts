import { useContext, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useCacheQueries } from "@hooks";
import { ILiveContext, LiveEvent } from "../../interfaces";
import { LiveContext } from "@contexts/live";

export type UseSubscriptionProps = {
    channel: string;
    resource: string;
    liveMode?: "immediate" | "controlled";
    enabled?: boolean;
    onLiveEvent?: (event: LiveEvent) => void;
};

export const useSubscription = ({
    resource,
    channel,
    enabled = false,
    liveMode,
    onLiveEvent,
}: UseSubscriptionProps): void => {
    const queryClient = useQueryClient();
    const getAllQueries = useCacheQueries();
    const liveDataContext = useContext<ILiveContext>(LiveContext);

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
