import { MutationMode } from "@interfaces";

export interface IAdminContext {
    mutationMode: MutationMode;
    warnWhenUnsavedChanges: boolean;
}
