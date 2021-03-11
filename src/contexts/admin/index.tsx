import React from "react";

import { IAdminContext } from "./IAdminContext";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
});

export const AdminContextProvider: React.FC<IAdminContext> = ({
    mutationMode,
    warnWhenUnsavedChanges,
    children,
}) => {
    return (
        <AdminContext.Provider value={{ mutationMode, warnWhenUnsavedChanges }}>
            {children}
        </AdminContext.Provider>
    );
};
