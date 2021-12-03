export type LiveEvent = {
    channel: string;
    type: "deleted" | "updated" | "created" | "*" | string;
    payload: {
        ids?: string[];
        [x: string]: any;
    };
    date: Date;
};
