import React from "react";
import { useResource } from "@pankod/refine-core";
import { createResourceRoutes } from "./create-resource-routes";
import { Routes } from "react-router-dom";

type ResourceRoutesProps = {
    indexRedirect?: boolean | string;
    children?: (routes: JSX.Element[]) => JSX.Element;
};

export const RefineRoutes = ({
    indexRedirect,
    children,
}: ResourceRoutesProps) => {
    const { resources: resourcesFromContext } = useResource();

    const routes = React.useMemo(() => {
        return createResourceRoutes(resourcesFromContext, { indexRedirect });
    }, [resourcesFromContext]);

    return children ? children(routes) : <Routes>{routes}</Routes>;
};
