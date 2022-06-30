export type ITelemetryData = {
    providers: {
        authProvider?: boolean;
        dataProvider?: boolean;
        routerProvider?: boolean;
        notificationProvider?: boolean;
        liveProvider?: boolean;
        auditLogProvider?: boolean;
        i18nProvider?: boolean;
        accessControlProvider?: boolean;
    };
    version: string;
    resourceCount: number;
};
