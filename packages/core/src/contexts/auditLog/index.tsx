import React from "react";

import { IAuditLogContext } from "./IAuditLogContext";

/** @deprecated default value for access control context has no use and is an empty object. */
export const defaultAuditLogContext: IAuditLogContext = {};

export const AuditLogContext = React.createContext<IAuditLogContext>({});

export const AuditLogContextProvider: React.FC<IAuditLogContext> = ({
    create,
    get,
    update,
    children,
}) => {
    return (
        <AuditLogContext.Provider value={{ create, get, update }}>
            {children}
        </AuditLogContext.Provider>
    );
};
