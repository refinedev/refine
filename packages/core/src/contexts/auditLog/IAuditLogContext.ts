import { BaseKey, MetaQuery } from "../../interfaces";

export type LogParams = {
    resource: string;
    action: string;
    data?: any;
    author?: {
        name?: string;
        [key: string]: any;
    };
    previousData?: any;
    /**
     * @deprecated `meta` is deprecated with refine@4, refine will pass `logMeta` instead, however, we still support `meta` for backward compatibility.
     */
    meta?: Record<number | string, any>;
    logMeta?: Record<number | string, any>;
};

export type IAuditLogContext = {
    create?: (params: LogParams) => Promise<any>;
    get?: (params: {
        resource: string;
        action?: string;
        /**
         * @deprecated `meta` is deprecated with refine@4, refine will pass `logMeta` instead, however, we still support `meta` for backward compatibility.
         */
        meta?: Record<number | string, any>;
        logMeta?: Record<number | string, any>;
        author?: Record<number | string, any>;
        metaData?: MetaQuery;
    }) => Promise<any>;
    update?: (params: {
        id: BaseKey;
        name: string;
        [key: string]: any;
    }) => Promise<any>;
};

export type AuditLogProvider = Required<IAuditLogContext>;
