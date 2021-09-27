import React from "react";

import { MutationMode, TitleProps, LayoutProps } from "../../interfaces";
import { RouteProps } from "react-router-dom";

export interface IRefineContext {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    customRoutes: RouteProps[];
    catchAll?: React.ReactNode;
    DashboardPage?: React.ElementType;
    LoginPage?: React.FC | false;
    Title: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    Sider: React.FC;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
}

export interface IRefineContextProvider {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    customRoutes: RouteProps[];
    catchAll?: React.ReactNode;
    DashboardPage?: React.ElementType;
    LoginPage?: React.FC | false;
    Title?: React.FC<TitleProps>;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
}
