import { useResource, useGetToPath } from "@pankod/refine-core";
import React from "react";
import { Navigate } from "react-router-dom";

type NavigateToResourceProps = {
    resource?: string;
    meta?: Record<string, unknown>;
};

export const NavigateToResource = ({
    resource: resourceProp,
    meta,
}: NavigateToResourceProps) => {
    const getToPath = useGetToPath();
    const { resource, resources } = useResource(resourceProp);

    const toResource = resource || resources.find((r) => r.list);

    if (toResource) {
        const path = getToPath({
            resource: toResource,
            action: "list",
            meta,
        });

        if (path) {
            return <Navigate to={path} />;
        }

        console.warn("No resource is found to navigate to.");
        return null;
    } else {
        console.warn("No resource is found to navigate to.");
        return null;
    }
};
