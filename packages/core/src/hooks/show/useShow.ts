import React, { useState } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";

import { useOne, useResourceWithRoute, useRouterContext } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
    SuccessErrorNotification,
    MetaDataQuery,
    LiveModeProps,
    BaseKey,
    HttpError,
} from "../../interfaces";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: BaseKey;
    setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
};

export type useShowProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
> = {
    /**
     * Resource name for API data interactions
     * @default Reads `:resource` from the URL
     */
    resource?: string;
    /**
     * Data item ID for API data interactions
     * @default Reads `:id` from the URL
     */
    id?: BaseKey;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetOneResponse<TData>, HttpError>;
    /**
     * Additional meta data to pass to the data provider's `getOne`
     */
    metaData?: MetaDataQuery;
    /**
     * Target data provider name for API call to be made
     * @default `"default"`
     */
    dataProviderName?: string;
} & LiveModeProps &
    SuccessErrorNotification;

/**
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/core/hooks/show/useShow} for more details.
 */
export const useShow = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    resource: resourceFromProp,
    id,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    dataProviderName,
    queryOptions,
}: useShowProps<TData, TError> = {}): useShowReturnType<TData> => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const defaultId =
        !resourceFromProp || resourceFromProp === routeResourceName
            ? id ?? idFromRoute
            : id;

    const [showId, setShowId] = useState<BaseKey | undefined>(defaultId);

    React.useEffect(() => {
        if (defaultId !== showId) {
            setShowId(defaultId);
        }
    }, [defaultId]);

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: showId ?? "",
        queryOptions: {
            enabled: showId !== undefined,
            ...queryOptions,
        },
        successNotification,
        errorNotification,
        metaData,
        liveMode,
        onLiveEvent,
        dataProviderName,
    });

    return {
        queryResult,
        showId,
        setShowId,
    };
};
