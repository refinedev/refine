import { SiderProps } from "@components/layoutWrapper/components/sider";
import { FC } from "react";
import { MutationMode, TitleProps, LayoutProps } from "../../interfaces";

export interface IAdminContext extends IAdminContextProvider {
    warnWhen: boolean;
    setWarnWhen: (value: boolean) => void;
}

export interface IAdminContextProvider {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    undoableTimeout: number;
    Title?: FC<TitleProps>;
    Layout: FC<LayoutProps>;
    Sider: FC<SiderProps>;
    Header: FC<unknown>;
    Footer: FC<unknown>;
    OffLayoutArea: FC<unknown>;
}
