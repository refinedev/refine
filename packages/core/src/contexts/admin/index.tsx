import React, { useState } from "react";

import { IAdminContext, IAdminContextProvider } from "./IAdminContext";
import {
    Layout as DefaultLayout,
    Header as DefaultHeader,
    Sider as DefaultSider,
    Footer as DefaultFooter,
    OffLayoutArea as DefaultOffLayoutArea,
} from "@components/layoutWrapper/components";

export const AdminContext = React.createContext<IAdminContext>({
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    warnWhen: false,
    setWarnWhen: (value: boolean) => value,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Sider: DefaultSider,
    Header: DefaultHeader,
    Footer: DefaultFooter,
    Layout: DefaultLayout,
    OffLayoutArea: DefaultOffLayoutArea,
});

export const AdminContextProvider: React.FC<IAdminContextProvider> = ({
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    Title,
    Layout = DefaultLayout,
    Header = DefaultHeader,
    Sider = DefaultSider,
    Footer = DefaultFooter,
    OffLayoutArea = DefaultOffLayoutArea,
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
                Header,
                Sider,
                Footer,
                OffLayoutArea,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
