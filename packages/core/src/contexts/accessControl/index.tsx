import React from "react";

import { IAccessControlContext } from "./IAccessControlContext";

/** @deprecated default value for access control context has no use and is an empty object. */
export const defaultAccessControlContext: IAccessControlContext = {};

export const AccessControlContext = React.createContext<IAccessControlContext>(
    {},
);

export const AccessControlContextProvider: React.FC<
    IAccessControlContext & {
        children?: React.ReactNode;
    }
> = ({ can, children }) => {
    return (
        <AccessControlContext.Provider value={{ can }}>
            {children}
        </AccessControlContext.Provider>
    );
};
