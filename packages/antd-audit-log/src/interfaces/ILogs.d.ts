export type ILog = {
    id: BaseKey;
    timestamp: string;
    author?: {
        name?: string;
    };
    name?: string;
    data: any;
    previousData: any;
};

export type ILogs = ILog[];
