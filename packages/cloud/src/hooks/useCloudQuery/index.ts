import { BaseRecord, HttpError } from "@pankod/refine-core";
import { useQuery, QueryObserverResult } from "@tanstack/react-query";

import { useSdk } from "../useSdk";

type UseCloudQueryParams = { key: string; config?: any; customParams?: any };

export const useCloudQuery = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    key,
    config,
    customParams,
}: UseCloudQueryParams): QueryObserverResult<TData> => {
    const { sdk } = useSdk();

    return useQuery<TData, TError>([key], () =>
        sdk.cloudQuery.runQuery({
            key,
            config,
            customParams,
        }),
    );
};
