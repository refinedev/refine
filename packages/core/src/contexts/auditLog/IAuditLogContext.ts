export type AuditLogEvent = {
    resource: string;
    action: string;
    data: any;
    author?: {
        name?: string;
        [key: string]: any;
    };
    previousData?: any;
    meta?: any;
};

export type IAuditLogContext =
    | {
          logEvent: (params: AuditLogEvent) => void;
          list: () => Promise<any>;
      }
    | undefined;

export interface IAuditLogContextProvider {
    auditLogProvider: IAuditLogContext;
}
