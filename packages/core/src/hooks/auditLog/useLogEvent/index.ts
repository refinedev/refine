import { useCallback, useContext } from "react";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { useGetIdentity } from "@hooks/auth";
import { AuditLogEvent } from "../../../interfaces";

export const useLogEvent = (): ((params: AuditLogEvent) => void) => {
    const liveContext = useContext(AuditLogContext);
    const { resources } = useContext(ResourceContext);
    const { data: identityData, refetch, isLoading } = useGetIdentity();

    const logEvent = useCallback(
        async (params: AuditLogEvent) => {
            const auditLogPermissions = resources.find(
                (p) => p.name === params.resource,
            )?.auditLogPermissions;

            if (auditLogPermissions) {
                const shouldAuditLog = auditLogPermissions.find(
                    (i) => i === params.action || i === "*",
                );

                if (shouldAuditLog) {
                    let authorData;
                    if (isLoading) {
                        authorData = await refetch();
                    }

                    liveContext?.logEvent({
                        ...params,
                        author: identityData ?? authorData?.data,
                    });
                }
            }
        },
        [resources, identityData],
    );

    return logEvent;
};
