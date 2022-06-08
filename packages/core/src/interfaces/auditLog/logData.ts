import { BaseKey } from "..";

export interface ILog<TData = any> {
    id: BaseKey;
    createdAt: string;
    author?: Record<number | string, any>;
    user?: Record<number | string, any>;
    name?: string;
    data: TData;
    previousData: TData;
    resource: string;
    action: string;
}

export type ILogData<TData = any> = ILog<TData>[];
