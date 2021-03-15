import React, { useState } from "react";

import { IAdminContext } from "./IAdminContext";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    warnWhen: false,
    setWarnWhen: (value: boolean) => value,
});

export const AdminContextProvider: React.FC<IAdminContext> = ({
    mutationMode,
    warnWhenUnsavedChanges,
    children,
}) => {
    const [warnWhen, setWarnWhen] = useState(false);
    return (
        <AdminContext.Provider
            value={{
                mutationMode,
                warnWhenUnsavedChanges,
                warnWhen: warnWhen,
                setWarnWhen: setWarnWhen,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
