import { useContext, useEffect } from "react";

import { LiveContext } from "@contexts/live";
import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    ILiveContext,
    LiveEvent,
    MetaDataQuery,
    Pagination,
} from "../../../interfaces";

export type UseSubscriptionProps = {
    /**
     * Channel name to subscribe.
     */
    channel: string;
    /**
     * Callback that is run when new events from subscription arrive.
     */
    onLiveEvent: (event: LiveEvent) => void;
    /**
     * Type of events to subscribe. `"*"` means all events.
     * @type Array<"deleted" | "updated" | "created" | "*" | string>
     */
    types?: LiveEvent["type"][];
    /**
     * Determines subscription should subscribe or not.
     * @type Array<"deleted" | "updated" | "created" | "*" | string>
     */
    enabled?: boolean;
    params?: {
        ids?: BaseKey[];
        id?: BaseKey;
        metaData?: MetaDataQuery;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        subscriptionType?: "useList" | "useOne" | "useMany";
        resource?: string;
        [key: string]: any;
    };
};

export const useSubscription = ({
    params,
    channel,
    types = ["*"],
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
                types,
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
