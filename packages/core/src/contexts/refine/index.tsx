import React, { useState } from "react";

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
    warnWhen: false,
    setWarnWhen: (value: boolean) => value,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Title: DefaultTitle,
    Sider: DefaultSider,
    Header: DefaultHeader,
    Footer: DefaultFooter,
    Layout: DefaultLayout,
    OffLayoutArea: DefaultOffLayoutArea,
    reactQueryClientConfig: {},
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
    reactQueryClientConfig = {},
}) => {
    const [warnWhen, setWarnWhen] = useState(false);
    return (
        <RefineContext.Provider
            value={{
                hasDashboard,
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
                reactQueryClientConfig,
            }}
        >
            {children}
        </RefineContext.Provider>
    );
};
