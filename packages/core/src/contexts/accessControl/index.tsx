import React from "react";

import { IAccessControlContext } from "./IAccessControlContext";

export const defaultAccessControlContext: IAccessControlContext = {
    can: () => Promise.resolve(true),
};

export const AccessControlContext = React.createContext<IAccessControlContext>(
    defaultAccessControlContext,
);

export const AccessControlContextProvider: React.FC<IAccessControlContext> = ({
    can,
    children,
}) => {
    return (
        <AccessControlContext.Provider value={{ can }}>
            {children}
        </AccessControlContext.Provider>
    );
};
