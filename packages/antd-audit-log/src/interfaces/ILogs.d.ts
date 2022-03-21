export type ILogs = {
    id: BaseKey;
    timestamp: string;
    author?: {
        name?: string;
    };
    data: any;
    previousData: any;
}[];
