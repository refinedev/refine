import React from "react";

import { IResourceContext } from "./IResourceContext";

export { IResourceItem } from "./IResourceContext";

export const ResourceContext = React.createContext<IResourceContext>({
    resources: [],
});

export const ResourceContextProvider: React.FC<IResourceContext> = ({
    resources,
    children,
}) => {
    return (
        <ResourceContext.Provider value={{ resources }}>
            {children}
        </ResourceContext.Provider>
    );
};
