import React from "react";

import { useRouterContext, useResourceWithRoute, useLogList } from "@hooks";
import {
    CrudFilters,
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
        action,
        id,
    } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(resourceFromRoute);

    const logFilters: CrudFilters = [];

    switch (action) {
        case "show":
        case "edit":
            logFilters.push(
                {
                    field: "action",
                    operator: "eq",
                    value: "update",
                },
                { field: "data.id", operator: "eq", value: id },
            );
            break;
        default:
            break;
    }

    const queryResult = useLogList({
        resource: resource.name,
        filters: logFilters,
    });

    if (component) {
        return React.createElement(component, {
            logQueryResult: queryResult,
        });
    }

    return null;
};
