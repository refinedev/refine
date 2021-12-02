import { useContext, useEffect } from "react";

import { LiveContext } from "@contexts/live";
import { ILiveContext, LiveEvent } from "../../interfaces";

export type UseSubscriptionProps = {
    channel: string;
    onLiveEvent: (event: LiveEvent) => void;
    params?: {
        [key: string]: any;
    };
    type?: LiveEvent["type"];
    enabled?: boolean;
};

export const useSubscription = ({
    params,
    channel,
    type = "*",
    enabled = true,
    onLiveEvent,
}: UseSubscriptionProps): void => {
    const liveDataContext = useContext<ILiveContext>(LiveContext);

    useEffect(() => {
        let subscription: any;

        if (enabled) {
            subscription = liveDataContext?.subscribe({
                channel,
                params,
                type,
                callback: onLiveEvent,
            });
        }

        return () => {
            if (subscription) {
                liveDataContext?.unsubscribe(subscription);
            }
        };
    }, [enabled]);
};
