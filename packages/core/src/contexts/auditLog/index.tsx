import React from "react";

import { IAuditLogContext, IAuditLogContextProvider } from "./IAuditLogContext";

export const AuditLogContext = React.createContext<IAuditLogContext>(undefined);

export const AuditLogContextProvider: React.FC<IAuditLogContextProvider> = ({
    auditLogProvider,
    children,
}) => {
    return (
        <AuditLogContext.Provider value={auditLogProvider}>
            {children}
        </AuditLogContext.Provider>
    );
};
