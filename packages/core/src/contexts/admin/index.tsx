import React, { useState } from "react";

import { IAdminContext, IAdminContextProvider } from "./IAdminContext";
import {
    Footer,
    Header,
    Sider,
    Layout,
    OffLayoutArea,
} from "@components/layoutWrapper/components";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    warnWhen: false,
    setWarnWhen: (value: boolean) => value,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Sider,
    Header,
    Footer,
    Layout,
    OffLayoutArea,
});

export const AdminContextProvider: React.FC<IAdminContextProvider> = ({
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    Title,
    Layout,
    Sider,
    Header,
    Footer,
    OffLayoutArea,
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
                Title,
                undoableTimeout,
                Layout,
                Sider,
                Header,
                Footer,
                OffLayoutArea,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
