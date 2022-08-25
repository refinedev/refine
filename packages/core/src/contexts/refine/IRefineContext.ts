import React, { ReactNode } from "react";

import {
    MutationMode,
    TitleProps,
    LayoutProps,
    LiveModeProps,
} from "../../interfaces";

export interface IRefineOptions {
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    undoableTimeout: number;
    liveMode: LiveModeProps["liveMode"];
}

export interface IRefineContext {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
    DashboardPage?: React.FC;
    LoginPage?: React.FC | false;
    Title?: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    liveMode: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    options: IRefineOptions;
}

export interface IRefineContextProvider {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
    DashboardPage?: React.FC;
    LoginPage?: React.FC | false;
    Title?: React.FC<TitleProps>;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    liveMode: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    options: IRefineOptions;
    children?: ReactNode;
}
