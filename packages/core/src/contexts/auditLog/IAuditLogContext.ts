import { BaseKey, MetaDataQuery } from "../../interfaces";

export type LogParams = {
    resource: string;
    action: string;
    data?: any;
    author?: {
        name?: string;
        [key: string]: any;
    };
    previousData?: any;
    meta?: any;
};

export type IAuditLogContext =
    | {
          log?: (params: LogParams) => void;
          list?: (params: {
              resource: string;
              params?: { id?: BaseKey; [key: string]: any };
              metaData?: MetaDataQuery;
          }) => Promise<any>;
          rename?: (params: {
              id: BaseKey;
              name: string;
              [key: string]: any;
          }) => Promise<any>;
      }
    | undefined;

export interface IAuditLogContextProvider {
    auditLogProvider: IAuditLogContext;
}
