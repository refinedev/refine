export type AuditLogEvent = {
    resource: string;
    action:
        | "create"
        | "update"
        | "delete"
        | "createMany"
        | "updateMany"
        | "deleteMany"
        | "*"
        | string;
    data: any;
    previousData?: any;
    meta?: any;
};

export interface IAuditLogContext {
    logEvent: (params: AuditLogEvent) => void;
}
