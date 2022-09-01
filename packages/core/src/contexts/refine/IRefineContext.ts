import React, { ReactNode } from "react";
import { QueryClientConfig } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
    MutationMode,
    TitleProps,
    LayoutProps,
    LiveModeProps,
    RedirectionTypes,
} from "../../interfaces";

export interface IRefineOptions {
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    undoableTimeout?: number;
    liveMode?: LiveModeProps["liveMode"];
    disableTelemetry?: boolean;
    redirect?: {
        afterCreate?: RedirectionTypes;
        afterClone?: RedirectionTypes;
        afterEdit?: RedirectionTypes;
    };
    reactQuery?: {
        clientConfig?: QueryClientConfig;
        devtoolConfig?: React.ComponentProps<typeof ReactQueryDevtools> | false;
    };
}

export interface IRefineContextOptions {
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    undoableTimeout: number;
    liveMode: LiveModeProps["liveMode"];
    redirect: {
        afterCreate: RedirectionTypes;
        afterClone: RedirectionTypes;
        afterEdit: RedirectionTypes;
    };
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
    options: IRefineContextOptions;
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
    options: IRefineContextOptions;
    children?: ReactNode;
}
