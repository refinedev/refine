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
    const auditLogContext = useContext(AuditLogContext);

    if (!auditLogContext) {
        throw new Error("auditLogProvider is not defined.");
    }

    if (!auditLogContext.get) {
        throw new Error("auditLogProvider's `get` is not defined.");
    }

    const queryKey = queryKeys(resource, undefined, metaData);

    const queryResponse = useQuery<TData, TError>(
        queryKey.logList(meta),
        () =>
            auditLogContext.get!({
                resource,
                action,
                author,
                meta,
                metaData,
            }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
