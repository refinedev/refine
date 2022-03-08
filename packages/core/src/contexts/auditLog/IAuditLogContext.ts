export type AuditLogActionType =
    | "create"
    | "update"
    | "delete"
    | "createMany"
    | "updateMany"
    | "deleteMany"
    | "*"
    | string;

export type AuditLogEvent = {
    resource: string;
    action: AuditLogActionType;
    data: any;
    previousData?: any;
    meta?: any;
};

export type IAuditLogContext =
    | {
          logEvent: (params: AuditLogEvent) => void;
      }
    | undefined;

export interface IAuditLogContextProvider {
    auditLogProvider: IAuditLogContext;
}
