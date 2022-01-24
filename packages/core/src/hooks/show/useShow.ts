import React, { useState } from "react";
import { QueryObserverResult } from "react-query";

import { useOne, useResourceWithRoute, useRouterContext } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
    SuccessErrorNotification,
    MetaDataQuery,
    LiveEvent,
    LiveModeProps,
} from "../../interfaces";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: string;
    setShowId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type useShowProps = {
    resource?: string;
    id?: string;
    metaData?: MetaDataQuery;
} & LiveModeProps &
    SuccessErrorNotification;

/**
 * `useShow` hook allows you to fetch the desired record.
 * It uses `getOne` method as query function from the dataProvider that is
 * passed to {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`}.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/show/useShow} for more details.
 */
export const useShow = <TData extends BaseRecord = BaseRecord>({
    resource: resourceFromProp,
    id,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
}: useShowProps = {}): useShowReturnType<TData> => {
    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const [showId, setShowId] = useState<string | undefined>(
        id ?? idFromRoute !== undefined
            ? decodeURIComponent(idFromRoute)
            : undefined,
    );

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
    });

    return {
        queryResult,
        showId,
        setShowId,
    };
};
