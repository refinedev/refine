import { BaseRecord, HttpError, UpdateResponse } from ".";
import { UseUpdateReturnType } from "../hooks/data/useUpdate";

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
    TVariables = {},
> = {
    autoSaveProps: AutoSaveIndicatorProps;
    onFinishAutoSave: (
        values: TVariables,
    ) => Promise<UpdateResponse<TData> | void> | void;
};

export type AutoSaveIndicatorProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {},
> = Pick<
    UseUpdateReturnType<TData, TError, TVariables>,
    "data" | "error" | "status"
>;
