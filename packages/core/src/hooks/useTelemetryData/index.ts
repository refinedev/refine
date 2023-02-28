import { useContext } from "react";

import { useAuthBindingsContext, useLegacyAuthContext } from "@contexts/auth";
import { AuditLogContext } from "@contexts/auditLog";
import { LiveContext } from "@contexts/live";
import { RouterContext } from "@contexts/legacy-router";
import { DataContext } from "@contexts/data";
import { TranslationContext } from "@contexts/translation";
import { NotificationContext } from "@contexts/notification";
import { AccessControlContext } from "@contexts/accessControl";
import { useResource } from "@hooks/resource";

import { ITelemetryData } from "../../interfaces/telementry";
import { useIsExistAuthentication } from "..";

// It reads and updates from package.json during build. ref: tsup.config.ts
const REFINE_VERSION = "1.0.0";

export const useTelemetryData = (): ITelemetryData => {
    const auth = useIsExistAuthentication();
    const auditLogContext = useContext(AuditLogContext);
    const liveContext = useContext(LiveContext);
    const routerContext = useContext(RouterContext);
    const dataContext = useContext(DataContext);
    const { i18nProvider } = useContext(TranslationContext);
    const notificationContext = useContext(NotificationContext);
    const accessControlContext = useContext(AccessControlContext);
    const { resources } = useResource();

    const auditLog =
        !!auditLogContext.create ||
        !!auditLogContext.get ||
        !!auditLogContext.update;

    const live =
        !!liveContext?.publish ||
        !!liveContext?.subscribe ||
        !!liveContext?.unsubscribe;

    const router =
        !!routerContext.useHistory ||
        !!routerContext.Link ||
        !!routerContext.Prompt ||
        !!routerContext.useLocation ||
        !!routerContext.useParams;

    const data = !!dataContext;

    const i18n =
        !!i18nProvider?.changeLocale ||
        !!i18nProvider?.getLocale ||
        !!i18nProvider?.translate;

    const notification =
        !!notificationContext.close || !!notificationContext.open;

    const accessControl = !!accessControlContext.can;

    return {
        providers: {
            auth,
            auditLog,
            live,
            router,
            data,
            i18n,
            notification,
            accessControl,
        },
        version: REFINE_VERSION,
        resourceCount: resources.length,
    };
};
