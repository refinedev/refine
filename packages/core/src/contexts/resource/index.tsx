import React from "react";

import { legacyResourceTransform } from "@definitions/helpers";
import { useDeepMemo } from "@hooks/deepMemo";

import { IResourceContext, IResourceItem, ResourceProps } from "./types";

export const ResourceContext = React.createContext<IResourceContext>({
  resources: [],
});

export const ResourceContextProvider: React.FC<
  React.PropsWithChildren<{ resources: ResourceProps[] }>
> = ({ resources: providedResources, children }) => {
  const resources: IResourceItem[] = useDeepMemo(() => {
    return legacyResourceTransform(providedResources ?? []);
  }, [providedResources]);

  return (
    <ResourceContext.Provider value={{ resources }}>
      {children}
    </ResourceContext.Provider>
  );
};
