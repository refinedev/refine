import React from "react";

import { useRouterContext, useResourceWithRoute, useLogList } from "@hooks";
import {
    IResourceComponentsProps,
    ResourceRouterParams,
} from "../../../interfaces";

//TODO: Define return type
export const withAuditLogs = (
    component?: React.FunctionComponent<IResourceComponentsProps>,
) => {
    const { useParams } = useRouterContext();
    const {
        resource: resourceFromRoute,
        id,
        action,
    } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceFromRoute);

    const queryResult = useLogList({
        resource: resource.name,
        params: { id },
        metaData: { action },
    });

    if (component) {
        return React.createElement(component, {
            logQueryResult: queryResult,
        });
    }

    return null;
};
