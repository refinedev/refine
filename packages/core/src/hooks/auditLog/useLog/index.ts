import { useContext } from "react";
import {
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { useGetIdentity } from "@hooks/auth";
import { BaseKey, LogParams } from "../../../interfaces";
import { hasPermission, queryKeys } from "@definitions/helpers";

type LogRenameData =
    | {
          resource?: string;
      }
    | undefined;

export type UseLogReturnType<TLogData, TLogRenameData> = {
    log: UseMutationResult<TLogData, Error, LogParams>;
    rename: UseMutationResult<
        TLogRenameData,
        Error,
        {
            id: BaseKey;
            name: string;
        }
    >;
};

/**
 * useLog is used to `create` a new and `rename` the existing audit log.
 * @see {@link https://refine.dev/docs/core/hooks/audit-log/useLog} for more details.
 */

export const useLog = <
    TLogData,
    TLogRenameData extends LogRenameData = LogRenameData,
>(): UseLogReturnType<TLogData, TLogRenameData> => {
    const queryClient = useQueryClient();
    const auditLogContext = useContext(AuditLogContext);

    const { resources } = useContext(ResourceContext);
    const {
        data: identityData,
        refetch,
        isLoading,
    } = useGetIdentity({
        queryOptions: {
            enabled: !!auditLogContext,
        },
    });

    const log = useMutation<TLogData, Error, LogParams, unknown>(
        async (params) => {
            const resource = resources.find((p) => p.name === params.resource);
            const logPermissions = resource?.options?.auditLog?.permissions;

            if (logPermissions) {
                if (!hasPermission(logPermissions, params.action)) {
                    return;
                }
            }

            let authorData;
            if (isLoading) {
                authorData = await refetch();
            }

            return await auditLogContext.create?.({
                ...params,
                author: identityData ?? authorData?.data,
            });
        },
    );

    const rename = useMutation<
        TLogRenameData,
        Error,
        { id: BaseKey; name: string },
        unknown
    >(
        async (params) => {
            return await auditLogContext.update?.(params);
        },
        {
            onSuccess: (data) => {
                if (data?.resource) {
                    const queryKey = queryKeys(data?.resource);
                    queryClient.invalidateQueries(queryKey.logList());
                }
            },
        },
    );

    return { log, rename };
};
