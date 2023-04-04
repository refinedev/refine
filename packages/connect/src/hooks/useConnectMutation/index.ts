import { BaseRecord, HttpError } from "@refinedev/core";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useSdk } from "../useSdk";

type RunVariables = { key: string; config?: any; customParams?: any };

// TODO: Add hook docs
export const useConnectMutation = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(): UseMutationResult<TData, TError, RunVariables, unknown> => {
    const { sdk } = useSdk();

    return useMutation<TData, TError, RunVariables, unknown>((params) =>
        sdk.connectQuery.runMutation(params),
    );
};
