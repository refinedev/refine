import React from "react";
import { useResource } from "@refinedev/core";
import { createResourceRoutes } from "./create-resource-routes";
import { Routes } from "react-router-dom";

type RefineRoutesProps = {
  children?: (routes: React.JSX.Element[]) => React.JSX.Element;
};

export const RefineRoutes = ({ children }: RefineRoutesProps) => {
  const { resources: resourcesFromContext } = useResource();

  const routes = React.useMemo(() => {
    return createResourceRoutes(resourcesFromContext);
  }, [resourcesFromContext]);

  return children ? children(routes) : <Routes>{routes}</Routes>;
};
