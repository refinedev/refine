import { SiderProps } from "@components/layoutWrapper/components/sider";
import React from "react";
import { MutationMode, TitleProps, LayoutProps } from "../../interfaces";

export interface IAdminContext {
    warnWhen: boolean;
    setWarnWhen: (value: boolean) => void;
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    Title?: React.FC<TitleProps>;
    Layout: React.FC<LayoutProps>;
    Sider: React.FC<SiderProps>;
    Header: React.FC;
    Footer: React.FC;
    OffLayoutArea: React.FC;
}

export interface IAdminContextProvider {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    Title?: React.FC<TitleProps>;
    Layout?: React.FC<LayoutProps>;
    Sider?: React.FC<SiderProps>;
    Header?: React.FC;
    Footer?: React.FC;
    OffLayoutArea?: React.FC;
}
