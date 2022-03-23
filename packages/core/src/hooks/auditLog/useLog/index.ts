import { useCallback, useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { useGetIdentity } from "@hooks/auth";
import { BaseKey, LogParams } from "../../../interfaces";
import { hasPermission } from "@definitions/helpers";

type LogRenameData =
    | {
          resource?: string;
      }
    | undefined;
export type UseLogReturnType<TLogRenameData> = {
    log: (params: LogParams) => Promise<void>;
    rename: UseMutationResult<
        TLogRenameData,
        Error,
        {
            id: BaseKey;
            name: string;
        }
    >;
};

export const useLog = <
    TLogRenameData extends LogRenameData = LogRenameData,
>(): UseLogReturnType<TLogRenameData> => {
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

    const log = useCallback(
        async (params: LogParams) => {
            if (!auditLogContext || !auditLogContext.log) {
                return;
            }

            const resource = resources.find((p) => p.name === params.resource);
            const logPermissions = resource?.options?.auditLog?.permissions;

            if (logPermissions) {
                const shouldLog = hasPermission(logPermissions, params.action);

                if (shouldLog) {
                    let authorData;
                    if (isLoading) {
                        authorData = await refetch();
                    }

                    auditLogContext.log({
                        ...params,
                        author: identityData ?? authorData?.data,
                    });

                    setTimeout(() => {
                        queryClient.invalidateQueries([
                            "useLogList",
                            resource?.name,
                        ]);
                    }, 500);
                }
            }
        },
        [resources, identityData, auditLogContext],
    );

    const rename = useMutation<
        TLogRenameData,
        Error,
        { id: BaseKey; name: string },
        unknown
    >(
        async (params) => {
            if (!auditLogContext) {
                throw new Error("auditLogProvider is not defined.");
            }

            if (!auditLogContext.rename) {
                throw new Error("auditLogProvider's `rename` is not defined.");
            }

            return await auditLogContext.rename?.(params);
        },
        {
            onSuccess: (data) => {
                if (data?.resource) {
                    queryClient.invalidateQueries([
                        "useLogList",
                        data.resource,
                    ]);
                } else {
                    queryClient.invalidateQueries(["useLogList"]);
                }
            },
        },
    );

    return { log, rename };
};
