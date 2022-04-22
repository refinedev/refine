import React, { useState } from "react";
import { QueryObserverResult } from "react-query";

import { useOne, useResourceWithRoute, useRouterContext } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
    SuccessErrorNotification,
    MetaDataQuery,
    LiveModeProps,
    BaseKey,
} from "../../interfaces";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: BaseKey;
    setShowId: React.Dispatch<React.SetStateAction<BaseKey | undefined>>;
};

export type useShowProps = {
    resource?: string;
    id?: BaseKey;
    metaData?: MetaDataQuery;
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
export const useShow = <TData extends BaseRecord = BaseRecord>({
    resource: resourceFromProp,
    id,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    dataProviderName,
}: useShowProps = {}): useShowReturnType<TData> => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const defaultId =
        !resourceFromProp || resourceFromProp === routeResourceName
            ? id ?? idFromRoute
            : id;

    const [showId, setShowId] = useState<BaseKey | undefined>(defaultId);

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: showId ?? "",
        queryOptions: {
            enabled: showId !== undefined,
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
