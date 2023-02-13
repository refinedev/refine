import React from "react";

import { IResourceContext } from "./IResourceContext";
import {
    IResourceItem,
    ResourceProps,
} from "../../interfaces/bindings/resource";
import { useDeepMemo } from "@hooks/deepMemo";
import { legacyResourceTransform } from "@definitions/helpers";

export {
    IResourceItem,
    IResourceComponents,
    IResourceComponentsProps,
    IResourceContext,
} from "../../interfaces/bindings/resource";

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
