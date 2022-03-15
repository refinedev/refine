import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { BaseKey, HttpError, MetaDataQuery } from "../../../interfaces";

export type UseLogProps<TData, TError> = {
    resource: string;
    params?: { id?: BaseKey; [key: string]: any };
    queryOptions?: UseQueryOptions<TData, TError>;
    metaData?: MetaDataQuery;
};

export const useLogList = <TData = any, TError extends HttpError = HttpError>({
    resource,
    params,
    metaData,
    queryOptions,
}: UseLogProps<TData, TError>): UseQueryResult<TData> => {
    const auditLogContext = useContext(AuditLogContext);

    if (!auditLogContext) {
        throw new Error("auditLogProvider is not defined.");
    }

    const queryResponse = useQuery<TData, TError>(
        ["useLogList", resource, { ...params, ...metaData }],
        () =>
            auditLogContext.list({
                resource,
                params,
                metaData,
            }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
