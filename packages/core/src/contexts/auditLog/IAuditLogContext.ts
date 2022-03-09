export type AuditLogEvent = {
    resource: string;
    action: string;
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
