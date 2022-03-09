import { useCallback, useContext } from "react";

import { AuditLogContext } from "@contexts/auditLog";
import { ResourceContext } from "@contexts/resource";
import { AuditLogEvent } from "../../../interfaces";

export const useLogEvent = (): ((params: AuditLogEvent) => void) => {
    const liveContext = useContext(AuditLogContext);
    const { resources } = useContext(ResourceContext);

    const logEvent = useCallback(
        (params: AuditLogEvent) => {
            const auditLogPermissions = resources.find(
                (p) => p.name === params.resource,
            )?.auditLogPermissions;

            if (auditLogPermissions) {
                const shouldAuditLog = auditLogPermissions.find(
                    (i) => i === params.action || i === "*",
                );

                if (shouldAuditLog) {
                    liveContext?.logEvent(params);
                }
            }
        },
        [resources],
    );

    return logEvent;
};
