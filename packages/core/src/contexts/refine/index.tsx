import React from "react";

import { IRefineContext, IRefineContextProvider } from "./IRefineContext";
import { DefaultLayout } from "@components/layoutWrapper/defaultLayout";

import { AuthPage as DefaultAuthPage } from "@components/pages";

export const RefineContext = React.createContext<IRefineContext>({
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Title: undefined,
    Sider: undefined,
    Header: undefined,
    Footer: undefined,
    Layout: DefaultLayout,
    OffLayoutArea: undefined,
    liveMode: "off",
    onLiveEvent: undefined,
});

export const RefineContextProvider: React.FC<IRefineContextProvider> = ({
    hasDashboard,
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    DashboardPage,
    Title,
    Layout = DefaultLayout,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
    AuthPage = DefaultAuthPage,
    catchAll,
    liveMode = "off",
    onLiveEvent,
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
                DashboardPage,
                AuthPage,
                catchAll,
                liveMode,
                onLiveEvent,
            }}
        >
            {children}
        </RefineContext.Provider>
    );
};
