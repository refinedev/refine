import React, { useState } from "react";

import { IAdminContext, IAdminContextProvider } from "./IAdminContext";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    warnWhen: false,
    setWarnWhen: (value: boolean) => value,
    syncWithLocation: false,
    title: "Readmin2",
});

export const AdminContextProvider: React.FC<IAdminContextProvider> = ({
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    children,
    title,
}) => {
    const [warnWhen, setWarnWhen] = useState(false);
    return (
        <AdminContext.Provider
            value={{
                mutationMode,
                warnWhenUnsavedChanges,
                warnWhen: warnWhen,
                setWarnWhen: setWarnWhen,
                syncWithLocation,
                title,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
