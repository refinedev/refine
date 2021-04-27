import { FC } from "react";
import { MutationMode, TitleProps, CustomLayoutProps } from "../../interfaces";

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
    CustomLayout?: FC<CustomLayoutProps>;
    CustomSider?: FC<unknown>;
    CustomHeader?: FC<unknown>;
    CustomFooter?: FC<unknown>;
}
