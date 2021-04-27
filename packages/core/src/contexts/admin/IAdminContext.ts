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
    undoableTimeout: number;
    Title?: FC<TitleProps>;
    CustomLayout?: FC<CustomLayoutProps>;
    CustomSider?: FC<unknown>;
    CustomHeader?: FC<unknown>;
    CustomFooter?: FC<unknown>;
    OffLayoutArea?: FC<unknown>;
}
