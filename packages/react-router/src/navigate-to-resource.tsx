import { useResource, useGetToPath } from "@refinedev/core";
import React, { type PropsWithChildren } from "react";
import { Navigate } from "react-router";

type NavigateToResourceProps = PropsWithChildren<{
  resource?: string;
  meta?: Record<string, unknown>;
}>;

export const NavigateToResource: React.FC<NavigateToResourceProps> = ({
  resource: resourceProp,
  meta,
}) => {
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
  }
  console.warn("No resource is found to navigate to.");
  return null;
};
