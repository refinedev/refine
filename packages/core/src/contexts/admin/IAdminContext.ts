import { ReactNode, FC } from "react";
import { MutationMode } from "../../interfaces";
import { LayoutProps } from "../../components/layout";

export type TitleProps = {
    collapsed: boolean;
};

export interface IAdminContext extends IAdminContextProvider {
    warnWhen: boolean;
    setWarnWhen: (value: boolean) => void;
}

export interface IAdminContextProvider {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    Title?: FC<TitleProps>;
    undoableTimeout: number;
    Layout?: FC<LayoutProps>;
    sider?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
}
