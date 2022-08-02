import { RefineProps } from "@components/containers";
import React, { ReactNode } from "react";

import {
    MutationMode,
    TitleProps,
    LayoutProps,
    LiveModeProps,
} from "../../interfaces";

export interface IRefineContext {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
    DashboardPage?: RefineProps["DashboardPage"];
    LoginPage?: React.FC | false;
    Title?: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
}

export interface IRefineContextProvider {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    catchAll?: React.ReactNode;
    DashboardPage?: RefineProps["DashboardPage"];
    LoginPage?: React.FC | false;
    Title?: React.FC<TitleProps>;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
    liveMode?: LiveModeProps["liveMode"];
    onLiveEvent?: LiveModeProps["onLiveEvent"];
    children?: ReactNode;
}
