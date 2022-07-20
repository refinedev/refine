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
    channel: string;
    onLiveEvent: (event: LiveEvent) => void;
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
    types?: LiveEvent["type"][];
    enabled?: boolean;
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
