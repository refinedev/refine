import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import { useResourceWithRoute, useOne } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
} from "../../interfaces";
import { useState } from "react";

export type useShowProps = {
    resourceName?: string;
    id?: string;
};

export const useShow = <RecordType extends BaseRecord = BaseRecord>({
    resourceName,
    id,
}: useShowProps) => {
    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const [showId, setShowId] = useState<string>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const name = resourceName ?? resource.name;
    const resourceId = id ?? showId ?? idFromRoute;

    const queryResult = useOne<RecordType>(name, resourceId, {
        enabled: !!resourceId,
    });

    return {
        queryResult: queryResult as QueryObserverResult<
            GetOneResponse<RecordType>
        >,
        showId,
        setShowId,
    };
};
