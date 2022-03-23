import { useCallback, useContext } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { useGetIdentity } from "@hooks/auth";
import { BaseKey, LogParams } from "../../../interfaces";
import { hasPermission } from "@definitions/helpers";

type TLogRenameData = void | false | string;
export type UseLogReturnType = {
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

export const useLog = (): UseLogReturnType => {
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
    >("useLogRename", auditLogContext?.rename, {
        onSuccess: (data: any) => {
            queryClient.invalidateQueries(["useLogList", data.resource]);
        },
    });

    return { log, rename };
};
