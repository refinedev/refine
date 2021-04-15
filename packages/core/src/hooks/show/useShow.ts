import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import { useResourceWithRoute, useOne } from "@hooks";

import {
    ResourceRouterParams,
    BaseRecord,
    GetOneResponse,
} from "../../interfaces";

export type useShowProps = {
    resourceName?: string;
    id?: string;
};

export const useShow = ({ resourceName, id }: useShowProps) => {
    const {
        resource: routeResourceName,
        id: idFromRoute,
    } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

    const name = resourceName ?? resource.name;
    const resourceId = id ?? idFromRoute;

    const queryResult = useOne(name, resourceId);

    return {
        queryResult: queryResult as QueryObserverResult<
            GetOneResponse<BaseRecord>
        >,
    };
};
