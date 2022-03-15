import { useCallback, useContext } from "react";
import { useQueryClient } from "react-query";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { useGetIdentity } from "@hooks/auth";
import { AuditLogEvent } from "../../../interfaces";

export const useLogEvent = (): ((params: AuditLogEvent) => void) => {
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

    const logEvent = useCallback(
        async (params: AuditLogEvent) => {
            if (!auditLogContext) {
                return;
            }

            const resource = resources.find((p) => p.name === params.resource);
            queryClient.invalidateQueries(["useLogList", resource?.name]);

            const auditLogPermissions = resource?.options?.auditLogPermissions;

            if (auditLogPermissions) {
                const shouldAuditLog = auditLogPermissions.find(
                    (i) => i === params.action || i === "*",
                );

                if (shouldAuditLog) {
                    let authorData;
                    if (isLoading) {
                        authorData = await refetch();
                    }

                    auditLogContext.logEvent?.({
                        ...params,
                        author: identityData ?? authorData?.data,
                    });
                }
            }
        },
        [resources, identityData, auditLogContext],
    );

    return logEvent;
};
