import React from "react";
import { MutationMode, TitleProps, LayoutProps } from "../../interfaces";

export interface IAdminContext {
    hasDashboard: boolean;
    warnWhen: boolean;
    setWarnWhen: (value: boolean) => void;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    showRevisions: boolean;
    undoableTimeout: number;
    Title: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    Sider: React.FC;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
}

export interface IAdminContextProvider {
    hasDashboard: boolean;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    showRevisions: boolean;
    undoableTimeout: number;
    Title?: React.FC<TitleProps>;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
}
