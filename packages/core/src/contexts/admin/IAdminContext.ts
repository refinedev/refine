import { MutationMode } from "../../interfaces";

export interface IAdminContext {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    warnWhen: boolean;
    syncWithLocation: boolean;
    setWarnWhen: (value: boolean) => void;
    title?: React.ReactNode;
    undoableTimeout: number;
}

export interface IAdminContextProvider {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
    syncWithLocation: boolean;
    title?: React.ReactNode;
    undoableTimeout: number;
}
