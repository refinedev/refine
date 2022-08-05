import { useContext, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    BaseKey,
    CrudFilters,
    CrudSorting,
    ILiveContext,
    IRefineContext,
    LiveEvent,
    LiveModeProps,
    MetaDataQuery,
    Pagination,
} from "../../../interfaces";
import { LiveContext } from "@contexts/live";
import { RefineContext } from "@contexts/refine";
import { queryKeys } from "@definitions";

export type UseResourceSubscriptionProps = {
    channel: string;
    params?: {
        ids?: BaseKey[];
        id?: BaseKey;
        metaData?: MetaDataQuery;
        pagination?: Pagination;
        hasPagination?: boolean;
        sort?: CrudSorting;
        filters?: CrudFilters;
        subscriptionType: "useList" | "useOne" | "useMany";
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
                params: {
                    resource,
                    ...params,
                },
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
