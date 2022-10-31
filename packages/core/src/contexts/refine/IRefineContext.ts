import { RefineProps } from "@components/containers";
import React, { ReactNode } from "react";
import { QueryClientConfig, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
    MutationMode,
    TitleProps,
    LayoutProps,
    LiveModeProps,
    RedirectAction,
} from "../../interfaces";

export interface IRefineOptions {
    breadcrumb?: ReactNode;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    undoableTimeout?: number;
    liveMode?: LiveModeProps["liveMode"];
    disableTelemetry?: boolean;
    redirect?: {
        afterCreate?: RedirectAction;
        afterClone?: RedirectAction;
        afterEdit?: RedirectAction;
    };
    reactQuery?: {
        clientConfig?: QueryClientConfig | InstanceType<typeof QueryClient>;
        devtoolConfig?: React.ComponentProps<typeof ReactQueryDevtools> | false;
    };
}

export interface IRefineContextOptions {
    breadcrumb?: ReactNode;
    mutationMode: MutationMode;
    syncWithLocation: boolean;
    warnWhenUnsavedChanges: boolean;
    undoableTimeout: number;
    liveMode: LiveModeProps["liveMode"];
    redirect: {
        afterCreate: RedirectAction;
        afterClone: RedirectAction;
        afterEdit: RedirectAction;
    };
}

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
    DashboardPage?: RefineProps["DashboardPage"];
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
