import { BaseRecord, HttpError } from "@refinedev/core";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";

import { useSdk } from "../useSdk";

type UseConnectQueryParams = { key: string; config?: any; customParams?: any };

export const useConnectQuery = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    key,
    config,
    customParams,
}: UseConnectQueryParams): QueryObserverResult<TData> => {
    const { sdk } = useSdk();

    return useQuery<TData, TError>([key], () =>
        sdk.connectQuery.runQuery({
            key,
            config,
            customParams,
        }),
    );
};
