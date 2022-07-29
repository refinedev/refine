import React from "react";

import { IAuditLogContext } from "./IAuditLogContext";

export const AuditLogContext = React.createContext<IAuditLogContext>({});

export const AuditLogContextProvider: React.FC<
    IAuditLogContext & {
        children: React.ReactNode;
    }
> = ({ create, get, update, children }) => {
    return (
        <AuditLogContext.Provider value={{ create, get, update }}>
            {children}
        </AuditLogContext.Provider>
    );
};
