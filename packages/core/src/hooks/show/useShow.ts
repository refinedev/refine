import React, { useState } from "react";
import { QueryObserverResult } from "react-query";

import { useOne, useResourceWithRoute, useRouterContext } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
    SuccessErrorNotification,
} from "../../interfaces";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: string;
    setShowId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type useShowProps = {
    resource?: string;
    id?: string;
} & SuccessErrorNotification;

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
}: useShowProps = {}): useShowReturnType<TData> => {
    const [showId, setShowId] = useState<string>();

    const { useParams } = useRouterContext();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const resourceId = showId ?? id ?? idFromRoute;

    const queryResult = useOne<TData>({
        resource: resource.name,
        id: resourceId,
        queryOptions: {
            enabled: !!resourceId,
        },
        successNotification,
        errorNotification,
    });

    return {
        queryResult,
        showId,
        setShowId,
    };
};
