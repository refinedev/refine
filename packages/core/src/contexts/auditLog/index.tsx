import React from "react";

import { IAuditLogContext } from "./IAuditLogContext";

export const AuditContext = React.createContext<IAuditLogContext>(
    {} as IAuditLogContext,
);

export const AuditContextProvider: React.FC<IAuditLogContext> = ({
    logEvent,
    children,
}) => {
    return (
        <AuditContext.Provider value={{ logEvent }}>
            {children}
        </AuditContext.Provider>
    );
};
