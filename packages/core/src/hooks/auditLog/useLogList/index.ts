import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { queryKeys } from "@definitions/helpers";
import { HttpError, MetaDataQuery } from "../../../interfaces";

export type UseLogProps<TData, TError> = {
    resource: string;
    action?: string;
    meta?: Record<number | string, any>;
    author?: Record<number | string, any>;
    queryOptions?: UseQueryOptions<TData, TError>;
    metaData?: MetaDataQuery;
};

export const useLogList = <TData = any, TError extends HttpError = HttpError>({
    resource,
    action,
    meta,
    author,
    metaData,
    queryOptions,
}: UseLogProps<TData, TError>): UseQueryResult<TData> => {
    const { get } = useContext(AuditLogContext);

    const queryKey = queryKeys(resource, undefined, metaData);

    const queryResponse = useQuery<TData, TError>(
        queryKey.logList(meta),
        () =>
            get?.({
                resource,
                action,
                author,
                meta,
                metaData,
            }) ?? Promise.resolve([]),
        {
            enabled: typeof get !== "undefined",
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
