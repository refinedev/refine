import React from "react";

import { IRefineContext, IRefineContextProvider } from "./IRefineContext";
import { DefaultLayout } from "@components/layoutWrapper/defaultLayout";

import { LoginPage as DefaultLoginPage } from "@components/pages";

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
    LoginPage = DefaultLoginPage,
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
                LoginPage,
                catchAll,
                liveMode,
                onLiveEvent,
            }}
        >
            {children}
        </RefineContext.Provider>
    );
};
