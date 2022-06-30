import { useContext, useEffect } from "react";

import { AuthContext } from "@contexts/auth";
import { AuditLogContext } from "@contexts/auditLog";
import { LiveContext } from "@contexts/live";
import { RouterContext } from "@contexts/router";
import { DataContext } from "@contexts/data";
import { TranslationContext } from "@contexts/translation";
import { NotificationContext } from "@contexts/notification";
import { AccessControlContext } from "@contexts/accessControl";
import { useResource } from "@hooks/resource";

import { ITelemetryData } from "../../interfaces/telementry";

// It reads and updates from package.json during build. ref: tsup.config.ts
const REFINE_VERSION = "1.0.0";

export const Telemetry: React.FC<{}> = () => {
    const authContext = useContext(AuthContext);
    const auditLogContext = useContext(AuditLogContext);
    const liveContext = useContext(LiveContext);
    const routerContext = useContext(RouterContext);
    const dataContext = useContext(DataContext);
    const i18nContext = useContext(TranslationContext);
    const notificationContext = useContext(NotificationContext);
    const accessControlContext = useContext(AccessControlContext);
    const { resources } = useResource();

    useEffect(() => {
        const authProvider = authContext.isProvided;
        const auditLogProvider =
            !!auditLogContext.create ||
            !!auditLogContext.update ||
            !!auditLogContext.get;
        const liveProvider = !!liveContext;
        const routerProvider = !!routerContext;
        const dataProvider = !!dataContext;
        const i18nProvider = !!i18nContext;
        const notificationProvider = !!notificationContext;
        const accessControlProvider = !!accessControlContext;

        const data: ITelemetryData = {
            providers: {
                authProvider,
                auditLogProvider,
                liveProvider,
                routerProvider,
                dataProvider,
                i18nProvider,
                notificationProvider,
                accessControlProvider,
            },
            version: REFINE_VERSION,
            resourceCount: resources.length,
        };

        // TODO: Send request
        console.log(JSON.stringify(data, null, 2));
    }, []);

    return null;
};
