import { BaseRecord, UpdateResponse } from ".";
import { MutationStatus } from "@tanstack/react-query";

export type AutoSaveProps<TResponse, TResponseError, TVariables> = {
    autoSave?: boolean;
    autoSaveDebounce?: number;
    onAutoSaveSuccess?: (
        data: UpdateResponse<TResponse>,
        variables: TVariables,
        context: any,
    ) => void;
    onAutoSaveError?: (
        error: TResponseError,
        variables: TVariables,
        context: any,
    ) => void;
};

export type AutoSaveReturnType<
    TData extends BaseRecord = BaseRecord,
    // TError extends HttpError = HttpError,
    TVariables = {},
> = {
    autoSaveProps: AutoSaveIndicatorProps;
    onFinishAutoSave: (
        values: TVariables,
    ) => Promise<UpdateResponse<TData> | void> | void;
};

export type AutoSaveIndicatorProps = {
    status: MutationStatus;
}; // UseUpdateReturnType<TData, TError, TVariables>;
