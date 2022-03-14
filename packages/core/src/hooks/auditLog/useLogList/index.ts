import { useContext } from "react";
import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import {
    CrudFilters,
    CrudSorting,
    HttpError,
    MetaDataQuery,
    Pagination,
} from "../../../interfaces";

export type UseLogProps<TData, TError> = {
    resource: string;
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
    queryOptions?: UseQueryOptions<TData, TError>;
    metaData?: MetaDataQuery;
};

export const useLogList = <TData = any, TError extends HttpError = HttpError>({
    resource,
    filters,
    pagination,
    sort,
    metaData,
    queryOptions,
}: UseLogProps<TData, TError>): UseQueryResult<TData> => {
    const auditLogContext = useContext(AuditLogContext);

    if (!auditLogContext) {
        throw new Error("auditLogProvider is not defined.");
    }

    const queryResponse = useQuery<TData, TError>(
        ["useLogList", resource, { sort, filters, pagination, metaData }],
        () =>
            auditLogContext?.list({
                resource,
                filters,
                metaData,
                pagination,
                sort,
            }),
        {
            ...queryOptions,
            retry: false,
        },
    );

    return queryResponse;
};
