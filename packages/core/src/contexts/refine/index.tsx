import React from "react";

import { IRefineContext, IRefineContextProvider } from "./IRefineContext";
import {
    Layout as DefaultLayout,
    Header as DefaultHeader,
    Sider as DefaultSider,
    Footer as DefaultFooter,
    OffLayoutArea as DefaultOffLayoutArea,
    Title as DefaultTitle,
} from "@components/layoutWrapper/components";

export const RefineContext = React.createContext<IRefineContext>({
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Title: DefaultTitle,
    Sider: DefaultSider,
    Header: DefaultHeader,
    Footer: DefaultFooter,
    Layout: DefaultLayout,
    OffLayoutArea: DefaultOffLayoutArea,
});

export const RefineContextProvider: React.FC<IRefineContextProvider> = ({
    hasDashboard,
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    Title = DefaultTitle,
    Layout = DefaultLayout,
    Header = DefaultHeader,
    Sider = DefaultSider,
    Footer = DefaultFooter,
    OffLayoutArea = DefaultOffLayoutArea,
}) => {
    return (
        <RefineContext.Provider
            value={{
                hasDashboard,
                mutationMode,
                warnWhenUnsavedChanges,
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
        </RefineContext.Provider>
    );
};
