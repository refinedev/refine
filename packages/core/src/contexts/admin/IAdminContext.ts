import { ReactNode } from "react";
import { MutationMode } from "../../interfaces";

export interface IAdminContext {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    warnWhen: boolean;
    syncWithLocation: boolean;
    setWarnWhen: (value: boolean) => void;
    title?: ReactNode;
    undoableTimeout: number;
    layout?: ReactNode;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}

export interface IAdminContextProvider {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    title?: ReactNode;
    undoableTimeout: number;
    layout?: ReactNode;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}
