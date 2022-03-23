import { BaseKey } from "..";

export interface ILog<TData = any> {
    id: BaseKey;
    timestamp: string;
    author?: {
        name?: string;
    };
    name?: string;
    data: TData;
    previousData: TData;
}

export type ILogData<TData = any> = ILog<TData>[];
