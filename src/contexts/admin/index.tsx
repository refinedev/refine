import React from "react";

import { IAdminContext } from "./IAdminContext";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
});

export const AdminContextProvider: React.FC<IAdminContext> = ({
    mutationMode,
    children,
}) => {
    return (
        <AdminContext.Provider value={{ mutationMode }}>
            {children}
        </AdminContext.Provider>
    );
};
