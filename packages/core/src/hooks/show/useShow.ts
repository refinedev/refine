import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import { useOne, useResourceWithRoute } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
} from "../../interfaces";

export type useShowReturnType<TData extends BaseRecord = BaseRecord> = {
    queryResult: QueryObserverResult<GetOneResponse<TData>>;
    showId?: string;
    setShowId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type useShowProps = {
    resource?: string;
    id?: string;
};

export const useShow = <TData extends BaseRecord = BaseRecord>({
    resource: resourceFromProp,
    id,
}: useShowProps = {}): useShowReturnType<TData> => {
    const [showId, setShowId] = useState<string>();

    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const resourceId = showId ?? id ?? idFromRoute;

    const queryResult = useOne<TData>(resource.name, resourceId, {
        enabled: !!resourceId,
    });

    return {
        queryResult,
        showId,
        setShowId,
    };
};
