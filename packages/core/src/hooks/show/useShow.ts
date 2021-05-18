import { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import { useOne } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
} from "../../interfaces";

export type useShowProps = {
    resource?: string;
    id?: string;
};

export const useShow = <RecordType extends BaseRecord = BaseRecord>({
    resource: resourceName,
    id,
}: useShowProps = {}) => {
    const [showId, setShowId] = useState<string>();
    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resource = resourceName ?? routeResourceName;
    const resourceId = showId ?? id ?? idFromRoute;

    const queryResult = useOne<RecordType>(resource, resourceId, {
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
